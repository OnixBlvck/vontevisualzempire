import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { TIME_OPTIONS, earliestBookingDate } from "@/lib/booking-options";
import { DEFAULT_SETTINGS } from "@/lib/site-content";

export const BUSINESSES = ["inknior", "onyxblvck", "fastcutedits"] as const;

const bookingInput = z
  .object({
    // "message" covers the general Send A Message form; it lands in the same inbox.
    business: z.enum([...BUSINESSES, "message"]),
    full_name: z.string().trim().min(1).max(120),
    contact_email: z.string().trim().email().max(160),
    details: z.string().trim().min(1).max(2000),
    preferred_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .or(z.literal("")),
    service: z.string().trim().min(1).max(120).optional(),
    preferred_time: z.enum(TIME_OPTIONS).optional(),
  })
  .superRefine((d, ctx) => {
    if (d.business === "message") return;
    if (!d.service) ctx.addIssue({ code: "custom", path: ["service"], message: "Choose a service." });
    if (!d.preferred_time) ctx.addIssue({ code: "custom", path: ["preferred_time"], message: "Choose a time." });
    if (!d.preferred_date) {
      ctx.addIssue({ code: "custom", path: ["preferred_date"], message: "Choose a date." });
    } else if (d.preferred_date < earliestBookingDate()) {
      ctx.addIssue({ code: "custom", path: ["preferred_date"], message: "Choose a future date." });
    }
  });

const BOOKING_COLUMNS =
  "id, business, full_name, contact_email, details, preferred_date, preferred_time, service, status, deposit_status, deposit_amount_cents, square_checkout_url, created_at";

export type BookingRequest = {
  id: string;
  business: string;
  full_name: string;
  contact_email: string;
  details: string;
  preferred_date: string | null;
  preferred_time: string | null;
  service: string | null;
  status: string;
  deposit_status: string;
  deposit_amount_cents: number | null;
  square_checkout_url: string | null;
  created_at: string;
};

export type CreateBookingResult = {
  request: BookingRequest;
  checkoutUrl: string | null;
  depositError: string | null;
};

export const createBookingRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => bookingInput.parse(data))
  .handler(async ({ data, context }): Promise<CreateBookingResult> => {
    const { supabase, userId } = context;

    if (data.business !== "message") {
      const { data: service, error } = await supabase
        .from("services")
        .select("id")
        .eq("business", data.business)
        .eq("name", data.service!)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw new Error("Could not check that service. Please try again.");
      if (!service) throw new Error("That service isn't available. Please choose another.");
    }

    const { data: settingRows } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["inknior_deposit_cents", "whatsapp_alert_number"]);
    const setting = (key: "inknior_deposit_cents" | "whatsapp_alert_number") =>
      settingRows?.find((r) => r.key === key)?.value ?? DEFAULT_SETTINGS[key];

    const depositCents =
      data.business === "inknior" ? Number.parseInt(setting("inknior_deposit_cents"), 10) || 0 : 0;

    const { data: row, error } = await supabase
      .from("booking_requests")
      .insert({
        user_id: userId,
        business: data.business,
        full_name: data.full_name,
        contact_email: data.contact_email,
        details: data.details,
        preferred_date: data.preferred_date ? data.preferred_date : null,
        preferred_time: data.preferred_time ?? null,
        service: data.service ?? null,
        deposit_status: depositCents > 0 ? "awaiting_payment" : "not_required",
        deposit_amount_cents: depositCents > 0 ? depositCents : null,
      })
      .select(BOOKING_COLUMNS)
      .single();
    if (error || !row) {
      console.error("Booking insert failed", error);
      throw new Error("Could not send your request. Please try again.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let request = row as BookingRequest;
    let checkoutUrl: string | null = null;
    let depositError: string | null = null;

    if (depositCents > 0) {
      try {
        const { createDepositCheckout } = await import("@/lib/square.server");
        const origin = new URL(getRequest().url).origin;
        const checkout = await createDepositCheckout({
          bookingId: row.id,
          amountCents: depositCents,
          buyerEmail: data.contact_email,
          redirectUrl: `${origin}/booking-received?request=${row.id}`,
        });
        const { data: updated, error: updateError } = await supabaseAdmin
          .from("booking_requests")
          .update({
            square_order_id: checkout.orderId,
            square_payment_link_id: checkout.paymentLinkId,
            square_checkout_url: checkout.url,
          })
          .eq("id", row.id)
          .eq("user_id", userId)
          .select(BOOKING_COLUMNS)
          .single();
        if (updateError || !updated) throw new Error("Could not save the deposit link.");
        request = updated as BookingRequest;
        checkoutUrl = checkout.url;
      } catch (e) {
        console.error("Deposit checkout failed", e);
        depositError =
          "Your request was saved, but the deposit payment couldn't be started. I'll follow up with payment details.";
      }
    }

    try {
      const { sendBookingAlert } = await import("@/lib/whatsapp.server");
      await sendBookingAlert(supabaseAdmin, row, setting("whatsapp_alert_number"));
    } catch (e) {
      console.error("WhatsApp alert failed", e);
    }

    return { request, checkoutUrl, depositError };
  });

export const listMyBookingRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("booking_requests")
      .select(BOOKING_COLUMNS)
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error("Could not load your requests.");
    return (data ?? []) as BookingRequest[];
  });

/** Re-checks a deposit with Square and records it once paid. */
export const refreshDepositStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    // RLS limits this read to the requester's own rows (or the admin).
    const { data: row, error } = await context.supabase
      .from("booking_requests")
      .select("id, deposit_status, square_order_id, square_checkout_url")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error("Could not check the deposit.");
    if (!row) throw new Error("Request not found.");

    if (row.deposit_status !== "awaiting_payment" || !row.square_order_id) {
      return { deposit_status: row.deposit_status, checkout_url: row.square_checkout_url };
    }

    const { isDepositOrderPaid } = await import("@/lib/square.server");
    let paid = false;
    try {
      paid = await isDepositOrderPaid(row.square_order_id);
    } catch (e) {
      console.error("Deposit status check failed", e);
      throw new Error("Could not reach Square to check the deposit. Please try again shortly.");
    }
    if (!paid) return { deposit_status: row.deposit_status, checkout_url: row.square_checkout_url };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: updateError } = await supabaseAdmin
      .from("booking_requests")
      .update({ deposit_status: "paid", deposit_paid_at: new Date().toISOString() })
      .eq("id", row.id)
      .eq("deposit_status", "awaiting_payment");
    if (updateError) throw new Error("Deposit was paid but couldn't be recorded. Please contact me.");
    return { deposit_status: "paid", checkout_url: row.square_checkout_url };
  });
