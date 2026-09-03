import { Instagram, Youtube, Mail, Music2, Video } from "lucide-react";
import { toast } from "sonner";
import titleEmblem from "@/assets/title-emblem.png.asset.json";

const QUICK_A = [
  { label: "Home", href: "#home" },
  { label: "OnixBlvck", href: "#onixblvck" },
  { label: "InkNior", href: "#inknior" },
  { label: "FastCutEdits", href: "#fastcutedits" },
  { label: "Portfolio", href: "#portfolio" },
];
const QUICK_B = [
  { label: "Pricing", href: "#pricing" },
  { label: "Booking", href: "#booking" },
  { label: "My Story", href: "#about" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 lg:grid-cols-[1.1fr_1fr_0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="metal-text display text-2xl">VonteVisualz</p>
          <p className="label-xs mt-2 text-[0.55rem]">The Creative Empire</p>
          <p className="text-[0.55rem] tracking-[0.28em] uppercase text-royal">
            Your Story. Your Identity. Your Vision.
          </p>
          <img
            src={titleEmblem.url}
            alt="VonteVisualz emblem"
            className="mt-6 w-40 mix-blend-screen object-contain opacity-90"
          />
        </div>

        <div>
          <p className="label-xs text-royal">Quick Links</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            <ul className="grid gap-2">
              {QUICK_A.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[0.66rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="grid gap-2">
              {QUICK_B.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[0.66rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="label-xs text-royal">Connect</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { Icon: Instagram, label: "Instagram", href: "#contact" },
              { Icon: Video, label: "TikTok", href: "#contact" },
              { Icon: Youtube, label: "YouTube", href: "#contact" },
              { Icon: Music2, label: "Spotify", href: "#onixblvck" },
              { Icon: Mail, label: "Email", href: "mailto:vontevisualz@gmail.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-border bg-secondary/60 text-foreground/70 transition-colors hover:border-royal/60 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="label-xs text-royal">Newsletter</p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Stay updated on new releases, drops, offers, and more from the Empire.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list.");
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="mt-4 flex flex-wrap gap-2"
          >
            <input
              required
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal"
            />
            <button
              type="submit"
              className="border border-royal/60 bg-royal/25 px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase transition-colors hover:bg-royal/45"
            >
              Subscribe
            </button>
          </form>
          <p className="label-xs mt-6 text-[0.55rem] text-royal">Scan to connect</p>
          <p className="text-[0.55rem] tracking-[0.22em] uppercase text-muted-foreground">
            All links. All empire.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-8 border-t border-border px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="label-xs text-royal">Empire</p>
          <ul className="mt-3 grid gap-1 text-[0.65rem] tracking-[0.14em] text-muted-foreground">
            <li><a href="#onixblvck" className="hover:text-foreground">OnixBlvck</a></li>
            <li><a href="#inknior" className="hover:text-foreground">InkNior</a></li>
            <li><a href="#fastcutedits" className="hover:text-foreground">FastCutEdits</a></li>
            <li><a href="#portfolio" className="hover:text-foreground">Portfolio</a></li>
          </ul>
        </div>
        <div>
          <p className="label-xs text-royal">Work</p>
          <ul className="mt-3 grid gap-1 text-[0.65rem] tracking-[0.14em] text-muted-foreground">
            <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#booking" className="hover:text-foreground">Process</a></li>
            <li><a href="#booking" className="hover:text-foreground">Booking</a></li>
            <li><a href="#about" className="hover:text-foreground">My Story</a></li>
          </ul>
        </div>
        <div>
          <p className="label-xs text-royal">Contact</p>
          <ul className="mt-3 grid gap-1 text-[0.65rem] tracking-[0.14em] text-muted-foreground">
            <li><a href="mailto:vontevisualz@gmail.com" className="hover:text-foreground">vontevisualz@gmail.com</a></li>
            <li><a href="mailto:vontevisualz@gmail.com" className="hover:text-foreground">vontevisualz@gmail.com</a></li>
            <li>Digital Business Card</li>
            <li>VonteVisualz.com</li>
          </ul>
        </div>
        <div>
          <p className="label-xs text-royal">Collaborator</p>
          <p className="mt-3 text-[0.65rem] tracking-[0.14em] uppercase text-silver">
            My Brother / CEO / Right-Hand Man
          </p>
          <p className="mt-2 text-[0.65rem] text-muted-foreground">Ryan Parkman</p>
          <a href="mailto:rparkman015@gmail.com" className="text-[0.65rem] text-muted-foreground hover:text-foreground">
            rparkman015@gmail.com
          </a>
          <p className="mt-2 text-[0.65rem] italic text-gold/80">
            "I'll never forget what you've done for me."
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-5 lg:px-8">
          <p className="label-xs text-[0.55rem]">
            © 2026 VonteVisualz Empire. All rights reserved.
          </p>
          <p className="label-xs text-[0.55rem]">Built by VonteVisualz</p>
        </div>
      </div>
    </footer>
  );
}
