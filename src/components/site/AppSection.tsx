import { Apple, Smartphone } from "lucide-react";
import mockup from "@/assets/app-mockup.jpg.asset.json";

const LIVE_SITE_URL = "https://vontevisualz.com";

interface AppLinkProps {
  Icon: any;
  label: string;
  href: string;
  isComingSoon?: boolean;
}

function AppLink({ Icon, label, href, isComingSoon }: AppLinkProps) {
  if (isComingSoon) {
    return (
      <a
        href={href}
        aria-label={`${label} app coming soon — visit the live site`}
        className="flex items-center gap-3 border border-border bg-secondary/50 px-5 py-3 text-left transition-colors hover:border-royal/60"
      >
        <Icon className="size-5 text-silver" />
        <span className="grid">
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-foreground">
            {label}
          </span>
          <span className="text-[0.55rem] tracking-[0.22em] uppercase text-gold/90">
            Coming Soon
          </span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 border border-border bg-secondary/50 px-5 py-3 text-left transition-colors hover:border-royal/60"
    >
      <Icon className="size-5 text-silver" />
      <span className="grid">
        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-foreground">
          {label}
        </span>
        <span className="text-[0.55rem] tracking-[0.22em] uppercase text-gold/90">
          Download Now
        </span>
      </span>
    </a>
  );
}

export function AppSection() {
  return (
    <section id="app" className="relative border-b border-border">
      <div className="night-sky absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="label-xs text-royal">Empire Access</p>
          <h2 className="metal-text mt-2 text-3xl sm:text-4xl">VonteVisualz App</h2>
          <p className="mt-3 text-[0.6rem] tracking-[0.28em] uppercase text-gold/90">
            Your Story. Your Identity. Your Vision.
          </p>
          <p className="mt-5 max-w-[46ch] text-xs leading-relaxed text-muted-foreground">
            A central creative hub connecting the VonteVisualz world — music, tattoos, visual
            design, bookings, creative services, and more.
          </p>

          <ul className="mt-6 grid gap-2 text-[0.65rem] tracking-[0.16em] uppercase text-silver">
            <li>InkNior — Tattoo</li>
            <li>Onyx Blvck — Music</li>
            <li>FastCutEdits — Design & Editing</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <AppLink Icon={Apple} label="iOS" href="/app" isComingSoon />
            <AppLink Icon={Smartphone} label="Android" href="/app" isComingSoon />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[360px]">
          <div className="absolute inset-0 -z-10 blur-3xl bg-royal/20" aria-hidden />
          <a href={LIVE_SITE_URL} aria-label="Visit the VonteVisualz live site">
          <img
            src={mockup.url}
            alt="VonteVisualz mobile app mockup showing InkNior, Onyx Blvck and FastCutEdits"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full border border-border object-contain"
          />
          </a>
        </div>
      </div>
    </section>
  );
}
