import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const BUSINESSES = ["inknior", "onyxblvck", "fastcutedits"] as const;

const bookingInput = z.object({
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
});

export type BookingRequest = {
  id: string;
  business: string;
  full_name: string;
  contact_email: string;
  details: string;
  preferred_date: string | null;
  status: string;
  created_at: string;
};

export const createBookingRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => bookingInput.parse(data))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("booking_requests")
      .insert({
        user_id: context.userId,
        business: data.business,
        full_name: data.full_name,
        contact_email: data.contact_email,
        details: data.details,
        preferred_date: data.preferred_date ? data.preferred_date : null,
      })
      .select("id, business, full_name, contact_email, details, preferred_date, status, created_at")
      .single();

    if (error) throw new Error(error.message);
    return row as BookingRequest;
  });

export const listMyBookingRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("booking_requests")
      .select("id, business, full_name, contact_email, details, preferred_date, status, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as BookingRequest[];
  });
