import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { createBookingRequest } from "@/lib/bookings.functions";

const inputClass =
  "border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal";

export function MessageForm() {
  const sendMessage = useServerFn(createBookingRequest);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

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
      await sendMessage({
        data: {
          business: "message",
          full_name: String(fd.get("full_name")),
          contact_email: String(fd.get("contact_email")),
          details: String(fd.get("details")),
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

  if (signedIn === false) {
    return (
      <div className="mt-6">
        <a
          href="/auth?next=%2F%23booking"
          className="inline-flex min-h-11 items-center border border-royal/50 bg-royal/15 px-6 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35"
        >
          Sign In To Send A Message
        </a>
        <p className="mt-3 text-[0.6rem] leading-relaxed text-muted-foreground">
          Prefer email?{" "}
          <a href="mailto:vontevisualz@gmail.com" className="underline hover:text-foreground">
            vontevisualz@gmail.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
      <label className="sr-only" htmlFor="message-name">
        Name
      </label>
      <input id="message-name" name="full_name" required placeholder="Name" className={inputClass} />

      <label className="sr-only" htmlFor="message-email">
        Email
      </label>
      <input
        id="message-email"
        name="contact_email"
        type="email"
        required
        placeholder="Email"
        className={inputClass}
      />

      <label className="sr-only" htmlFor="message-details">
        Message
      </label>
      <textarea
        id="message-details"
        name="details"
        required
        rows={4}
        placeholder="Tell me about the project"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={busy || signedIn === null}
        className="border border-royal/50 bg-royal/15 px-6 py-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35 disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send A Message"}
      </button>
    </form>
  );
}
