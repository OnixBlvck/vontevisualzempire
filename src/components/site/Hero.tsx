import { Crown, Shield, Zap, Infinity as InfinityIcon } from "lucide-react";
import heroLogo from "@/assets/hero-logo.png.asset.json";
import titleEmblem from "@/assets/title-emblem.png.asset.json";

const PILLARS = [
  {
    icon: Crown,
    title: "Artistry",
    body: "We create with emotion, precision, and intention in every detail.",
  },
  { icon: Shield, title: "Identity", body: "We build more than visuals. We build legacies." },
  { icon: Zap, title: "Innovation", body: "We push boundaries and turn ideas into impact." },
  { icon: InfinityIcon, title: "Legacy", body: "We don't chase trends. We leave something timeless." },
];

export function Hero() {
  return (
    <section id="home" className="night-sky relative border-b border-border">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 lg:grid-cols-[1fr_320px] lg:gap-8 lg:px-8 lg:py-20">
        <div className="reveal grid items-center gap-8 md:grid-cols-[minmax(180px,300px)_1fr]">
          <img
            src={heroLogo.url}
            alt="VonteVisuals phoenix and rose emblem"
            className="mx-auto w-full max-w-[300px] object-contain"
          />

          <div className="text-center md:text-left">
            <div className="flex flex-nowrap items-center justify-center gap-2 md:justify-start">
              <h1 className="metal-text whitespace-nowrap text-[8vw] leading-none sm:text-5xl lg:text-6xl">
                VonteVisuals
              </h1>
              <img
                src={titleEmblem.url}
                alt="VonteVisuals thorn rose emblem"
                className="h-12 w-auto shrink-0 mix-blend-screen object-contain brightness-125 sm:h-16 lg:h-20"
              />
            </div>
            <p className="mt-5 text-xs tracking-[0.22em] uppercase text-silver">
              Scars tell stories, but beauty is pain.
            </p>
            <p className="mt-2 text-[0.66rem] tracking-[0.28em] uppercase text-royal">
              Your story. Your identity. Your vision.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#brands"
                className="inline-block border border-royal/60 bg-royal/20 px-8 py-3 text-[0.7rem] tracking-[0.26em] uppercase transition-colors hover:bg-royal/40"
              >
                Enter the Empire
              </a>
              <a
                href="#music"
                className="inline-block border border-border bg-secondary/50 px-8 py-3 text-[0.7rem] tracking-[0.26em] uppercase transition-colors hover:bg-secondary"
              >
                The Music Vault
              </a>
            </div>
          </div>
        </div>

        <aside className="panel p-6 lg:border-y-0 lg:border-r-0">
          <p className="label-xs text-foreground/60">The VonteVisuals Empire</p>
          <ul className="mt-6 grid gap-6">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-royal" />
                <div>
                  <p className="text-[0.7rem] tracking-[0.2em] uppercase text-silver">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
