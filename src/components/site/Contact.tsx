import { Mail, MapPin, Instagram } from "lucide-react";
import { toast } from "sonner";
import vcardQr from "@/assets/vcard-qr.png.asset.json";
import emblem from "@/assets/vonte-emblem.jpg.asset.json";

export function Contact() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 lg:grid-cols-4 lg:px-8">
        {/* 1 — Let's connect */}
        <div>
          <p className="label-xs text-royal">Contact</p>
          <h2 className="metal-text mt-2 text-2xl">Let's Connect</h2>
          <ul className="mt-5 grid gap-3 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 text-royal" />
              <a href="mailto:vontevisualz@gmail.com" className="hover:text-foreground">
                vontevisualz@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 text-royal" /> Houston, Texas
            </li>
          </ul>
          <div className="mt-5 grid gap-2">
            {[
              { label: "Onyx Blvck", handle: "@iamonixblvck", url: "https://www.instagram.com/iamonixblvck/" },
              { label: "FastCutEdits", handle: "@fast.cuteditz", url: "https://www.instagram.com/fast.cuteditz/" },
              { label: "InkNior", handle: "@inknior", url: "https://www.instagram.com/inknior/" },
            ].map((s) => (
              <a
                key={s.handle}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 border border-border bg-secondary/50 px-3 text-[0.6rem] tracking-[0.18em] uppercase text-silver transition-colors hover:border-royal/60 hover:text-foreground"
              >
                <Instagram className="size-4 text-royal" />
                <span>{s.label}</span>
                <span className="ml-auto normal-case tracking-normal text-muted-foreground">
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 2 — Collaborate */}
        <div id="booking">
          <p className="label-xs text-royal">Collaborate</p>
          <h2 className="metal-text mt-2 text-2xl">Build The Empire</h2>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Tattoos, music, design, or a full visual rollout — if you're building something that
            deserves to be seen, bring it here. Every project starts with a conversation.
          </p>
          <a
            href="mailto:vontevisualz@gmail.com"
            className="mt-6 inline-block border border-royal/50 bg-royal/15 px-6 py-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35"
          >
            Start A Project →
          </a>
        </div>

        {/* 3 — Send a message */}
        <div>
          <p className="label-xs text-royal">Message</p>
          <h2 className="metal-text mt-2 text-2xl">Send A Message</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent. I'll get back to you.");
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="mt-5 grid gap-3"
          >
            <input
              required
              placeholder="Name"
              className="border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal"
            />
            <textarea
              required
              rows={4}
              placeholder="What are we building?"
              className="border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal"
            />
            <button
              type="submit"
              className="border border-royal/60 bg-royal/25 px-5 py-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/45"
            >
              Send
            </button>
          </form>
        </div>

        {/* 4 — Digital business card */}
        <div>
          <p className="label-xs text-royal">Digital Business Card</p>
          <div className="panel mt-5 p-6 text-center">
            <img
              src={emblem.url}
              alt="VonteVisualz emblem"
              className="mx-auto h-16 w-auto object-contain"
            />
            <p className="metal-text mt-3 text-xl">VonteVisualz</p>
            <p className="mt-2 text-[0.65rem] tracking-[0.16em] uppercase text-silver">
              Da'zson Bolding
            </p>
            <p className="text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
              Houston, Texas
            </p>
            <p className="mt-2 text-[0.62rem] text-muted-foreground">vontevisualz@gmail.com</p>
            <p className="text-[0.62rem] text-muted-foreground">VonteVisualz.com</p>
            <img
              src={vcardQr.url}
              alt="QR code to save VonteVisualz contact"
              loading="lazy"
              className="mx-auto mt-5 size-32 bg-white p-2"
            />
            <p className="label-xs mt-3 text-[0.55rem] text-gold">Scan To Save Contact</p>
          </div>
        </div>
      </div>
    </section>
  );
}
