import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { createBookingRequest } from "@/lib/bookings.functions";
import { TIME_OPTIONS, earliestBookingDate } from "@/lib/booking-options";
import { useSiteContent } from "@/hooks/use-site-content";
import { BUSINESS_IDS, BUSINESS_LABELS, formatDeposit, servicesFor, type BusinessId } from "@/lib/site-content";

const inputClass =
  "border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal";

export function BookingForm() {
  const submitBooking = useServerFn(createBookingRequest);
  const navigate = useNavigate();
  const { services, settings } = useSiteContent();
  const [busy, setBusy] = useState(false);
  const [business, setBusiness] = useState<BusinessId>("inknior");
  const [minDate, setMinDate] = useState("");
  const businessServices = servicesFor(services, business);
  const deposit = formatDeposit(settings.inknior_deposit_cents);

  useEffect(() => {
    setMinDate(earliestBookingDate());
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    try {
      const result = await submitBooking({
        data: {
          business,
          service: String(fd.get("service") ?? ""),
          full_name: String(fd.get("full_name")),
          contact_email: String(fd.get("contact_email")),
          details: String(fd.get("details")),
          preferred_date: String(fd.get("preferred_date") ?? ""),
          preferred_time: String(fd.get("preferred_time") ?? ""),
          website: String(fd.get("website") ?? ""),
        },
      });
      form.reset();
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      if (result.depositError) toast.warning(result.depositError);
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
      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        />
        <label className="sr-only" htmlFor="booking-business">Business</label>
        <select
          id="booking-business"
          name="business"
          required
          className={inputClass}
          value={business}
          onChange={(e) => setBusiness(e.target.value as BusinessId)}
        >
          {BUSINESS_IDS.map((id) => (
            <option key={id} value={id}>{BUSINESS_LABELS[id]}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="booking-service">Service</label>
        <select id="booking-service" name="service" required className={inputClass} key={business}>
          {businessServices.length === 0 && <option value="">No services available</option>}
          {businessServices.map((svc) => (
            <option key={svc.id} value={svc.name}>{svc.name} — {svc.price_label}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="booking-name">Name</label>
        <input id="booking-name" name="full_name" required placeholder="Name" className={inputClass} />

        <label className="sr-only" htmlFor="booking-email">Email</label>
        <input id="booking-email" name="contact_email" type="email" required placeholder="Email" className={inputClass} />

        <label className="label-xs text-[0.55rem] text-muted-foreground" htmlFor="booking-date">Date</label>
        <input id="booking-date" name="preferred_date" type="date" required min={minDate} className={inputClass} />

        <label className="label-xs text-[0.55rem] text-muted-foreground" htmlFor="booking-time">Time</label>
        <select id="booking-time" name="preferred_time" required className={inputClass} defaultValue="">
          <option value="" disabled>Select a time</option>
          {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <label className="sr-only" htmlFor="booking-details">Details</label>
        <textarea id="booking-details" name="details" required rows={4} placeholder="What are we building?" className={inputClass} />
        {business === "inknior" && deposit && (
          <p className="text-[0.6rem] leading-relaxed text-gold">
            InkNior requests include a {deposit} deposit, paid securely through Square after you send this form.
          </p>
        )}
        <button
          type="submit"
          disabled={busy || businessServices.length === 0}
          className="border border-royal/60 bg-royal/25 px-5 py-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/45 disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send Request"}
        </button>
      </form>
      <p className="mt-3 text-[0.6rem] leading-relaxed text-muted-foreground">
        Every service requires an upfront deposit before work begins. InkNior: $30 deposit.
        Other service deposit amounts are confirmed with your quote.
      </p>
    </div>
  );
}
