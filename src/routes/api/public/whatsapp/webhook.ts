import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookRequest } from "@lovable.dev/webhooks-js";

// Receives WhatsApp delivery statuses forwarded by Lovable. Every delivery is
// signature-checked, stored, then processed; unfinished rows are retried later.
export const Route = createFileRoute("/api/public/whatsapp/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["WHATSAPP_API_KEY"];
        if (!secret) return new Response("Not configured", { status: 503 });

        let payload: unknown;
        try {
          ({ payload } = await verifyWebhookRequest({
            req: request,
            secret,
            maxBodyBytes: 4 * 1024 * 1024,
          }));
        } catch {
          return new Response("Invalid signature", { status: 401 });
        }

        const deliveryId = request.headers.get("x-lovable-delivery");
        const event = request.headers.get("x-lovable-event");
        if (!deliveryId || !event) return new Response("Missing delivery headers", { status: 400 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { processStoredEvent, processPendingEvents } = await import("@/lib/whatsapp.server");

        const { error: insertError } = await supabaseAdmin
          .from("whatsapp_webhook_events")
          .upsert(
            { delivery_id: deliveryId, event, payload: payload as never },
            { onConflict: "delivery_id", ignoreDuplicates: true },
          );
        if (insertError) {
          console.error("WhatsApp webhook store failed", insertError);
          return new Response("Store failed", { status: 500 });
        }

        const { data: row, error: readError } = await supabaseAdmin
          .from("whatsapp_webhook_events")
          .select("id, event, payload, attempts, processed_at")
          .eq("delivery_id", deliveryId)
          .single();
        if (readError || !row) return new Response("Store failed", { status: 500 });

        if (!row.processed_at) {
          const ok = await processStoredEvent(supabaseAdmin, row);
          if (!ok) return new Response("Processing failed", { status: 500 });
        }

        // Retry a few older unfinished deliveries on each call.
        await processPendingEvents(supabaseAdmin, 5);
        return new Response("ok");
      },
    },
  },
});
