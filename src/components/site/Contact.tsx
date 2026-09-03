import { Mail, MapPin, Instagram, Youtube, Music2, Video } from "lucide-react";
import { toast } from "sonner";
import vcardQr from "@/assets/vcard-qr.png.asset.json";
import titleEmblem from "@/assets/title-emblem.png.asset.json";

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
              <a href="mailto:contact@vontevisuals.com" className="hover:text-foreground">
                contact@vontevisuals.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 text-royal" /> Houston, Texas
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Video, label: "TikTok" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Music2, label: "Music" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-border bg-secondary/60 text-foreground/70"
              >
                <Icon className="size-4" />
              </span>
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
            href="mailto:contact@vontevisuals.com"
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
              src={titleEmblem.url}
              alt="VonteVisuals emblem"
              className="mx-auto h-14 w-auto mix-blend-screen object-contain"
            />
            <p className="metal-text mt-3 text-xl">VonteVisuals</p>
            <p className="mt-2 text-[0.65rem] tracking-[0.16em] uppercase text-silver">
              Da'zson Bolding
            </p>
            <p className="text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
              Houston, Texas
            </p>
            <p className="mt-2 text-[0.62rem] text-muted-foreground">contact@vontevisuals.com</p>
            <p className="text-[0.62rem] text-muted-foreground">VonteVisuals.com</p>
            <img
              src={vcardQr.url}
              alt="QR code to save VonteVisuals contact"
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
