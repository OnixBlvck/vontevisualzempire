import { createFileRoute, Link } from "@tanstack/react-router";
import { Apple, Smartphone, Globe } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import mockup from "@/assets/app-mockup.jpg.asset.json";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "VonteVisualz App | Coming Soon" },
      { name: "description", content: "The VonteVisualz app for InkNior, Onyx Blvck and FastCutEdits is coming soon. Use the live site today." },
      { property: "og:title", content: "VonteVisualz App | Coming Soon" },
      { property: "og:description", content: "Music, tattoos, design and bookings in one hub. Coming soon to iOS and Android." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppPage,
});

const FEATURES = [
  { title: "Book Sessions", body: "Request InkNior, Onyx Blvck or FastCutEdits sessions with date, service and time." },
  { title: "Track Requests", body: "See the status of every booking request in your private inbox." },
  { title: "Music", body: "Stream Onyx Blvck releases, starting with POP MY SHIT." },
  { title: "Portfolio", body: "Browse tattoo, design, music and video work." },
];

function StoreButton({ Icon, label }: { Icon: typeof Apple; label: string }) {
  return (
    <button type="button" disabled aria-disabled className="flex cursor-not-allowed items-center gap-3 border border-border bg-secondary/50 px-5 py-3 text-left opacity-80">
      <Icon className="size-5 text-silver" />
      <span className="grid">
        <span className="text-[0.6rem] tracking-[0.2em] uppercase">{label}</span>
        <span className="text-[0.55rem] tracking-[0.22em] uppercase text-gold/90">Coming Soon</span>
      </span>
    </button>
  );
}

function AppPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <div className="night-sky absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="label-xs text-royal">Empire Access</p>
            <h1 className="metal-text mt-2 text-4xl">VonteVisualz App</h1>
            <p className="mt-4 max-w-[46ch] text-xs leading-relaxed text-muted-foreground">
              The mobile app is in development and not yet in the App Store or Google Play. Everything it will do is available now on the live site.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <StoreButton Icon={Apple} label="iOS" />
              <StoreButton Icon={Smartphone} label="Android" />
              <Link to="/" className="flex items-center gap-3 border border-royal/60 bg-royal/25 px-5 py-3 transition-colors hover:bg-royal/45">
                <Globe className="size-5 text-silver" />
                <span className="grid">
                  <span className="text-[0.6rem] tracking-[0.2em] uppercase">Web</span>
                  <span className="text-[0.55rem] tracking-[0.22em] uppercase text-gold/90">Use It Now</span>
                </span>
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f.title} className="border border-border bg-card/40 p-4">
                  <h2 className="text-sm">{f.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <img src={mockup.url} alt="VonteVisualz mobile app mockup showing InkNior, Onyx Blvck and FastCutEdits" width={1024} height={1024} className="mx-auto w-full max-w-[380px] border border-border object-contain" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
