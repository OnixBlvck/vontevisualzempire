import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { createBookingRequest } from "@/lib/bookings.functions";

const inputClass =
  "border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal";

export function MessageForm() {
  const sendMessage = useServerFn(createBookingRequest);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    try {
      await sendMessage({
        data: {
          business: "message",
          full_name: String(fd.get("full_name")),
          contact_email: String(fd.get("contact_email")),
          details: String(fd.get("details")),
          website: String(fd.get("website") ?? ""),
        },
      });
      toast.success("Message received. I'll reply by email.");
      form.reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your message.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
      />
      <label className="sr-only" htmlFor="message-name">Name</label>
      <input id="message-name" name="full_name" required placeholder="Name" className={inputClass} />

      <label className="sr-only" htmlFor="message-email">Email</label>
      <input id="message-email" name="contact_email" type="email" required placeholder="Email" className={inputClass} />

      <label className="sr-only" htmlFor="message-details">Message</label>
      <textarea id="message-details" name="details" required rows={4} placeholder="Tell me about the project" className={inputClass} />

      <button
        type="submit"
        disabled={busy}
        className="border border-royal/50 bg-royal/15 px-6 py-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35 disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send A Message"}
      </button>
      <p className="text-[0.6rem] leading-relaxed text-muted-foreground">
        Prefer email? <a href="mailto:contact@vontevisuals.com" className="underline hover:text-foreground">contact@vontevisuals.com</a>
      </p>
    </form>
  );
}
