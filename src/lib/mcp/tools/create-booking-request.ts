import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_booking_request",
  title: "Create booking request",
  description:
    "Submit a booking request to VonteVisualz for InkNior (tattoo), Onyx Blvck (music) or FastCutEdits (design). Saved privately for the signed-in person.",
  inputSchema: {
    business: z
      .enum(["inknior", "onyxblvck", "fastcutedits"])
      .describe("Which business the request is for."),
    full_name: z.string().trim().min(1).max(120).describe("Name of the person booking."),
    contact_email: z.string().trim().email().max(160).describe("Reply-to email address."),
    details: z.string().trim().min(1).max(2000).describe("What the project or session is."),
    preferred_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Optional preferred date, YYYY-MM-DD."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("booking_requests")
      .insert({
        user_id: ctx.getUserId(),
        business: input.business,
        full_name: input.full_name,
        contact_email: input.contact_email,
        details: input.details,
        preferred_date: input.preferred_date ?? null,
      })
      .select("id, business, full_name, preferred_date, status, created_at")
      .single();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Booking request saved.\n${JSON.stringify(data, null, 2)}` }],
      structuredContent: { request: data as Record<string, unknown> },
    };
  },
});
