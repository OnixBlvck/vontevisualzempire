import { createElement, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Apple, Smartphone, Globe, ArrowLeft, CalendarDays, Music2, Images, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import logo from "@/assets/hero-logo.png.asset.json";
import empire from "@/assets/app-preview-empire.jpg.asset.json";
import services from "@/assets/app-preview-services.jpg.asset.json";
import portfolio from "@/assets/app-preview-portfolio.jpg.asset.json";

const SCREENSHOTS = [
  { title: "The Empire", image: empire.url },
  { title: "Creative Services", image: services.url },
  { title: "The Work", image: portfolio.url },
];

const FEATURES = [
  { Icon: CalendarDays, title: "Booking Requests", body: "Choose InkNior, Onyx Blvck or FastCutEdits, a service, date and time. Final confirmation follows review." },
  { Icon: Inbox, title: "Private Inbox", body: "Review your submitted requests and their status after signing in." },
  { Icon: Music2, title: "Onyx Blvck Music", body: "Listen to POP MY SHIT through the existing music player." },
  { Icon: Images, title: "Creative Portfolio", body: "Explore tattoo artistry, music, design and video work." },
];

export function AppPlatformPage({ platform }: { platform: "iOS" | "Android" }) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<(typeof SCREENSHOTS)[number] | null>(null);
  const PlatformIcon = platform === "iOS" ? Apple : Smartphone;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1100px] px-4 py-10 lg:px-8 lg:py-14">
        <Button asChild variant="link" className="mb-8 px-0 text-silver">
          <Link to="/app"><ArrowLeft /> App overview</Link>
        </Button>
        <section className="border-b border-border pb-10">
          <div className="flex items-start gap-5 sm:gap-7">
            <img src={logo.url} alt="VonteVisualz emblem" width={120} height={120} className="size-20 shrink-0 border border-border object-contain sm:size-28" />
            <div className="min-w-0">
              <p className="label-xs text-royal">{platform} · App Preview</p>
              <h1 className="metal-text mt-2 break-words text-2xl sm:text-4xl">VonteVisualz</h1>
              <p className="mt-2 text-sm text-silver">Your story. Your identity. Your vision.</p>
            </div>
          </div>
          <p className="mt-6 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
            InkNior. Onyx Blvck. FastCutEdits. One creative empire, coming to {platform}.
            The mobile app is not released yet; there is no {platform === "iOS" ? "App Store" : "Google Play"} listing or download available.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button disabled variant="secondary" className="h-auto min-h-11 whitespace-normal px-5 py-3" aria-label={`${platform} download coming soon`}>
              <PlatformIcon /> {platform} Download · Coming Soon
            </Button>
            <Button asChild className="h-auto min-h-11 px-5 py-3">
              <Link to="/"><Globe /> Use the Web Version</Link>
            </Button>
          </div>
        </section>
        <section className="border-b border-border py-10" aria-labelledby="screenshots-title">
          <h2 id="screenshots-title" className="text-xl text-silver">Screenshots</h2>
          <p className="mt-2 text-sm text-muted-foreground">Current mobile website previews — not native {platform} app screenshots.</p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SCREENSHOTS.map((screenshot) => (
              <figure key={screenshot.title} className="mx-auto w-full max-w-[300px]">
                <Button variant="ghost" className="block h-auto w-full overflow-hidden rounded-md border border-border p-0" onClick={() => setSelectedScreenshot(screenshot)} aria-label={`Enlarge ${screenshot.title} screenshot`}>
                  <img src={screenshot.image} alt={`${screenshot.title} on the VonteVisualz mobile website`} width={780} height={1420} loading="lazy" className="aspect-[39/71] w-full object-cover" />
                </Button>
                <figcaption className="mt-3 text-sm text-silver">{screenshot.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="py-10" aria-labelledby="features-title">
          <h2 id="features-title" className="text-xl text-silver">Explore the Web Version</h2>
          <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {FEATURES.map(({ Icon, title, body }) => (
              <li key={title} className="flex items-start gap-4">
                {createElement(Icon, { className: "mt-1 size-5 shrink-0 text-royal", "aria-hidden": true })}
                <div><h3 className="text-sm text-foreground">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></div>
              </li>
            ))}
          </ul>
        </section>
        <nav aria-label="App platforms" className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Button asChild variant="outline"><Link to="/app/ios"><Apple /> iOS Preview</Link></Button>
          <Button asChild variant="outline"><Link to="/app/android"><Smartphone /> Android Preview</Link></Button>
        </nav>
      </main>
      <Footer />
      <Dialog open={selectedScreenshot !== null} onOpenChange={(open) => { if (!open) setSelectedScreenshot(null); }}>
        <DialogContent className="max-h-[90dvh] max-w-sm overflow-y-auto">
          <DialogTitle>{selectedScreenshot?.title}</DialogTitle>
          <DialogDescription>VonteVisualz mobile website preview</DialogDescription>
          {selectedScreenshot && <img src={selectedScreenshot.image} alt={`${selectedScreenshot.title} mobile website screenshot`} width={780} height={1420} className="w-full" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}