import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { createBookingRequest } from "@/lib/bookings.functions";

const BUSINESS_OPTIONS = [
  { value: "inknior", label: "InkNior — Tattoo" },
  { value: "onyxblvck", label: "Onyx Blvck — Music" },
  { value: "fastcutedits", label: "FastCutEdits — Design" },
];

const SERVICES: Record<string, string[]> = {
  inknior: ["Names & Lettering", "Blackwork", "Realism"],
  onyxblvck: ["Hook Only", "Verse Only", "Full Songwriting", "Recording", "Features", "Beats", "Mixing/Mastering"],
  fastcutedits: ["Flyers", "Graphic Edits", "Cover Art", "Branding Package", "Web Design"],
};

const TIME_OPTIONS = Array.from({ length: 11 }, (_, i) => {
  const h = 10 + i;
  return `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "PM" : "AM"}`;
});

const inputClass =
  "border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal";

export function BookingForm() {
  const submitBooking = useServerFn(createBookingRequest);
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [business, setBusiness] = useState("inknior");
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    try {
      await submitBooking({
        data: {
          business: String(fd.get("business")) as "inknior" | "onyxblvck" | "fastcutedits",
          full_name: String(fd.get("full_name")),
          contact_email: String(fd.get("contact_email")),
          details: `Service: ${String(fd.get("service"))}\nRequested time: ${String(fd.get("preferred_time"))}\n\n${String(fd.get("details"))}`,
          preferred_date: String(fd.get("preferred_date") ?? ""),
        },
      });
      form.reset();
      void navigate({ to: "/booking-received" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your request.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="label-xs text-royal">Booking</p>
      <h2 className="metal-text mt-2 text-2xl">Request A Booking</h2>

      {signedIn === false ? (
        <div className="mt-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Sign in to send a booking request and track its status in your inbox.
          </p>
          <a
            href="/auth?next=%2F%23booking"
            className="mt-5 inline-flex min-h-11 items-center border border-royal/60 bg-royal/25 px-5 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/45"
          >
            Sign In To Book
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
          <label className="sr-only" htmlFor="booking-business">
            Business
          </label>
          <select id="booking-business" name="business" required className={inputClass} value={business} onChange={(e) => setBusiness(e.target.value)}>
            {BUSINESS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="booking-service">
            Service
          </label>
          <select id="booking-service" name="service" required className={inputClass} key={business}>
            {(SERVICES[business] ?? []).map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="booking-name">
            Name
          </label>
          <input id="booking-name" name="full_name" required placeholder="Name" className={inputClass} />

          <label className="sr-only" htmlFor="booking-email">
            Email
          </label>
          <input
            id="booking-email"
            name="contact_email"
            type="email"
            required
            placeholder="Email"
            className={inputClass}
          />

          <label className="label-xs text-[0.55rem] text-muted-foreground" htmlFor="booking-date">
            Date
          </label>
          <input id="booking-date" name="preferred_date" type="date" required min={minDate} className={inputClass} />

          <label className="label-xs text-[0.55rem] text-muted-foreground" htmlFor="booking-time">
            Time
          </label>
          <select id="booking-time" name="preferred_time" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a time
            </option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="booking-details">
            Details
          </label>
          <textarea
            id="booking-details"
            name="details"
            required
            rows={4}
            placeholder="What are we building?"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={busy || signedIn === null}
            className="border border-royal/60 bg-royal/25 px-5 py-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/45 disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send Request"}
          </button>
          <a
            href="/inbox"
            className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
          >
            View my requests →
          </a>
        </form>
      )}
      <p className="mt-3 text-[0.6rem] leading-relaxed text-muted-foreground">
        Requests are reviewed manually. Nothing is confirmed until I reply and any deposit is
        arranged.
      </p>
    </div>
  );
}
