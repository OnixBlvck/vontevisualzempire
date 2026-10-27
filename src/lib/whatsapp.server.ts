// WhatsApp Business alerts to the owner, plus processing of verified webhook deliveries.
// Server-only: uses connector credentials and the privileged database client.
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type Admin = SupabaseClient<Database>;

const GATEWAY_URL = "https://connector-gateway.lovable.dev/whatsapp";
export const BOOKING_ALERT_TEMPLATE = "new_booking_request_alert";

const STATUS_RANK: Record<string, number> = { accepted: 0, sent: 1, delivered: 2, read: 3 };
const STATUS_TIME_COLUMN = {
  sent: "sent_at",
  delivered: "delivered_at",
  read: "read_at",
  failed: "failed_at",
} as const;

export async function sendBookingAlert(
  admin: Admin,
  booking: {
    id: string;
    business: string;
    full_name: string;
    service: string | null;
    preferred_date: string | null;
    preferred_time: string | null;
  },
  toDigits: string,
): Promise<void> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const whatsappKey = process.env["WHATSAPP_API_KEY"];
  if (!lovableKey || !whatsappKey) {
    console.warn("WhatsApp alert skipped: WhatsApp is not connected.");
    return;
  }
  const to = toDigits.replace(/\D/g, "");
  if (!to) return;

  const labels: Record<string, string> = {
    inknior: "InkNior",
    onyxblvck: "Onyx Blvck",
    fastcutedits: "FastCutEdits",
    message: "a direct message",
  };
  const what = [labels[booking.business] ?? booking.business, booking.service]
    .filter(Boolean)
    .join(" - ");
  const when = booking.preferred_date
    ? `${booking.preferred_date}${booking.preferred_time ? ` at ${booking.preferred_time}` : ""}`
    : "not given";

  const response = await fetch(`${GATEWAY_URL}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": whatsappKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: BOOKING_ALERT_TEMPLATE,
        language: { code: "en_US" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: booking.full_name.slice(0, 60) },
              { type: "text", text: what.slice(0, 80) },
              { type: "text", text: when },
            ],
          },
        ],
      },
    }),
  });
  const body = await response.text();

  if (!response.ok) {
    console.error(`WhatsApp alert failed [${response.status}]: ${body}`);
    await admin.from("whatsapp_messages").insert({
      booking_request_id: booking.id,
      to_number: to,
      template_name: BOOKING_ALERT_TEMPLATE,
      status: "failed",
      error: `${response.status}: ${body.slice(0, 1000)}`,
      failed_at: new Date().toISOString(),
    });
    return;
  }

  const messageId = (JSON.parse(body) as { messages?: { id?: string }[] }).messages?.[0]?.id;
  const { error } = await admin.from("whatsapp_messages").insert({
    booking_request_id: booking.id,
    to_number: to,
    template_name: BOOKING_ALERT_TEMPLATE,
    provider_message_id: messageId ?? null,
    status: "accepted",
  });
  if (error) console.error("Could not save WhatsApp alert record", error);

  // A status callback may have arrived before this record existed.
  await processPendingEvents(admin, 10);
}

type StatusUpdate = {
  id?: string;
  status?: string;
  timestamp?: string;
  errors?: unknown[];
};

function statusesFrom(payload: unknown): StatusUpdate[] {
  const value = (payload as {
    entry?: { changes?: { value?: { statuses?: StatusUpdate[] } }[] }[];
  })?.entry?.[0]?.changes?.[0]?.value;
  return value?.statuses ?? [];
}

/** Applies one status callback. Returns false when the outbound record is not saved yet. */
async function applyStatus(admin: Admin, update: StatusUpdate): Promise<boolean> {
  if (!update.id || !update.status) return true;
  const { data: message, error } = await admin
    .from("whatsapp_messages")
    .select("id, status, sent_at, delivered_at, read_at, failed_at, error")
    .eq("provider_message_id", update.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!message) return false;

  const eventTime = update.timestamp
    ? new Date(Number(update.timestamp) * 1000).toISOString()
    : new Date().toISOString();
  const patch: Database["public"]["Tables"]["whatsapp_messages"]["Update"] = {};

  const column = STATUS_TIME_COLUMN[update.status as keyof typeof STATUS_TIME_COLUMN];
  if (column && !message[column]) patch[column] = eventTime;

  if (update.status === "failed") {
    if ((STATUS_RANK[message.status] ?? 0) < STATUS_RANK["delivered"]!) patch.status = "failed";
    if (update.errors?.length) patch.error = JSON.stringify(update.errors).slice(0, 2000);
  } else if (
    update.status in STATUS_RANK &&
    message.status !== "failed" &&
    STATUS_RANK[update.status]! > (STATUS_RANK[message.status] ?? 0)
  ) {
    patch.status = update.status as "sent" | "delivered" | "read";
  }

  if (Object.keys(patch).length === 0) return true;
  const { error: updateError } = await admin.from("whatsapp_messages").update(patch).eq("id", message.id);
  if (updateError) throw new Error(updateError.message);
  return true;
}

/** Processes one stored delivery. Unknown event types are kept and acknowledged. */
export async function processStoredEvent(
  admin: Admin,
  row: { id: string; event: string; payload: unknown; attempts: number },
): Promise<boolean> {
  try {
    let complete = true;
    if (row.event === "whatsapp.status") {
      for (const update of statusesFrom(row.payload)) {
        if (!(await applyStatus(admin, update))) complete = false;
      }
    }
    const { error } = await admin
      .from("whatsapp_webhook_events")
      .update(
        complete
          ? { processed_at: new Date().toISOString(), processing_error: null, attempts: row.attempts + 1 }
          : { processing_error: "Waiting for the matching outbound message", attempts: row.attempts + 1 },
      )
      .eq("id", row.id);
    if (error) throw new Error(error.message);
    return true;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await admin
      .from("whatsapp_webhook_events")
      .update({ processing_error: message.slice(0, 1000), attempts: row.attempts + 1 })
      .eq("id", row.id);
    return false;
  }
}

/** Bounded recovery pass; least-attempted rows first so blocked rows cannot starve others. */
export async function processPendingEvents(admin: Admin, limit: number): Promise<void> {
  const { data, error } = await admin
    .from("whatsapp_webhook_events")
    .select("id, event, payload, attempts")
    .is("processed_at", null)
    .lt("attempts", 200)
    .order("attempts", { ascending: true })
    .order("received_at", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("WhatsApp recovery query failed", error);
    return;
  }
  for (const row of data ?? []) await processStoredEvent(admin, row);
}
