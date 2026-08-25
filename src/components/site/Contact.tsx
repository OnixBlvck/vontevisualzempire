import { useState } from "react";
import { toast } from "sonner";
import { Mail, Globe, CreditCard } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="label-xs text-royal">Contact</p>
          <h2 className="metal-text mt-2 text-3xl">Start Your Vision</h2>
          <ul className="mt-8 grid gap-3 text-[0.7rem] tracking-[0.14em] text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-royal" />
              <a href="mailto:book@vontevisualz.com" className="hover:text-foreground">
                book@vontevisualz.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-royal" />
              <a href="mailto:contact@vontevisualz.com" className="hover:text-foreground">
                contact@vontevisualz.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <CreditCard className="size-4 text-royal" /> Digital Business Card
            </li>
            <li className="flex items-center gap-2">
              <Globe className="size-4 text-royal" /> VonteVisualz.com
            </li>
          </ul>
          <div className="panel mt-8 p-6">
            <p className="label-xs text-royal">Collaborator</p>
            <p className="mt-3 text-[0.7rem] tracking-[0.16em] uppercase text-silver">
              My Brother / CEO / Right-Hand Man
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Ryan Parkman</p>
            <a
              href="mailto:rparkman015@gmail.com"
              className="mt-1 block text-xs text-muted-foreground hover:text-foreground"
            >
              rparkman015@gmail.com
            </a>
            <p className="mt-3 text-xs italic text-gold/80">
              "I'll never forget what you've done for me."
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Request received. We'll reach out to confirm your booking.");
          }}
          className="panel grid gap-4 p-8"
        >
          <label className="grid gap-2">
            <span className="label-xs">Name</span>
            <input
              required
              name="name"
              className="border border-input bg-ink/60 px-3 py-2 text-sm outline-none focus:border-royal"
            />
          </label>
          <label className="grid gap-2">
            <span className="label-xs">Email</span>
            <input
              required
              type="email"
              name="email"
              className="border border-input bg-ink/60 px-3 py-2 text-sm outline-none focus:border-royal"
            />
          </label>
          <label className="grid gap-2">
            <span className="label-xs">Service</span>
            <select
              name="service"
              className="border border-input bg-ink/60 px-3 py-2 text-sm outline-none focus:border-royal"
            >
              <option>InkNior — Tattoo</option>
              <option>OnixBlvck — Music</option>
              <option>FastCutEdits — Design / Video</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="label-xs">Preferred Date</span>
            <input
              type="date"
              name="date"
              className="border border-input bg-ink/60 px-3 py-2 text-sm outline-none focus:border-royal"
            />
          </label>
          <label className="grid gap-2">
            <span className="label-xs">Your Vision</span>
            <textarea
              required
              name="vision"
              rows={4}
              className="border border-input bg-ink/60 px-3 py-2 text-sm outline-none focus:border-royal"
            />
          </label>
          <button
            type="submit"
            className="border border-royal/60 bg-royal/25 px-6 py-3 text-[0.68rem] tracking-[0.24em] uppercase transition-colors hover:bg-royal/45"
          >
            {sent ? "Request Sent" : "Submit Your Vision"}
          </button>
          <p className="label-xs text-[0.55rem]">$30 deposit to secure time</p>
        </form>
      </div>
    </section>
  );
}
