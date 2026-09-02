import heroLogo from "@/assets/hero-logo.png.asset.json";
import thornyEmblem from "@/assets/thorny-v-emblem.png.asset.json";
import onixArt from "@/assets/onix-art.jpg.asset.json";
import heroCity from "@/assets/hero-city.jpg.asset.json";
import { MusicPlayer } from "./MusicPlayer";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-border">
      <img
        src={heroCity.url}
        alt=""
        aria-hidden
        width={1920}
        height={1088}
        className="absolute inset-0 size-full object-cover opacity-60"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 10%, color-mix(in oklab, var(--royal) 22%, transparent), transparent 60%), linear-gradient(to bottom, color-mix(in oklab, var(--ink) 55%, transparent), var(--ink) 92%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-4 pt-10 pb-12 lg:px-8 lg:pt-14">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Left artwork */}
          <img
            src={heroLogo.url}
            alt="VonteVisualz phoenix and rose emblem"
            className="mx-auto w-full max-w-[240px] object-contain lg:max-w-[280px]"
          />

          {/* Center titles */}
          <div className="text-center">
            <div className="flex flex-nowrap items-center justify-center gap-2">
              <h1 className="metal-text whitespace-nowrap text-[8.5vw] leading-none sm:text-5xl lg:text-6xl">
                VonteVisualz
              </h1>
              <img
                src={thornyEmblem.url}
                alt="Thorny V emblem with golden tear"
                className="h-12 w-auto shrink-0 object-contain mix-blend-screen sm:h-16 lg:h-[4.5rem]"
              />
            </div>
            <p className="mt-4 text-[0.6rem] tracking-[0.3em] uppercase text-royal sm:text-[0.68rem]">
              Your story. Your identity. Your vision.
            </p>
            <p className="display mt-5 text-sm leading-relaxed tracking-[0.16em] uppercase text-silver sm:text-base">
              Scars tell stories, but beauty is pain.
            </p>
            <p className="mx-auto mt-4 max-w-[42ch] text-xs leading-relaxed text-muted-foreground">
              One empire, three identities — tattoo artistry, music, and design built from
              real life and carried with intention.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#brands"
                className="border border-royal/60 bg-royal/25 px-7 py-3 text-[0.66rem] tracking-[0.26em] uppercase transition-colors hover:bg-royal/45"
              >
                Enter the Empire
              </a>
              <a
                href="#music"
                className="border border-border bg-secondary/50 px-7 py-3 text-[0.66rem] tracking-[0.26em] uppercase transition-colors hover:bg-secondary"
              >
                The Music Vault
              </a>
            </div>
          </div>

          {/* Right artwork */}
          <img
            src={onixArt.url}
            alt="OnixBlvck rose artwork"
            loading="lazy"
            className="mx-auto w-full max-w-[240px] border border-border object-cover lg:max-w-[280px]"
          />
        </div>

        {/* Player integrated in the lower hero */}
        <div className="mt-10">
          <MusicPlayer />
        </div>
      </div>
    </section>
  );
}
