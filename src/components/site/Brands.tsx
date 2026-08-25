import { useState } from "react";
import {
  Play,
  Pause,
  Music2,
  Youtube,
  Apple,
  Cloud,
  Palette,
  Video,
  Layers,
  ImageIcon,
  Brush,
  Circle,
  Type,
  Sparkles,
} from "lucide-react";

const INK_SERVICES = [
  { icon: Brush, label: "Blackwork" },
  { icon: Circle, label: "Realism" },
  { icon: Type, label: "Lettering" },
  { icon: Sparkles, label: "Custom" },
];

const FCE_SERVICES = [
  { icon: Video, label: "Video Editing" },
  { icon: Palette, label: "Graphic Design" },
  { icon: Layers, label: "Branding" },
  { icon: ImageIcon, label: "Cover Art" },
];

const STREAMS = [
  { icon: Music2, label: "Spotify" },
  { icon: Apple, label: "Music" },
  { icon: Youtube, label: "YouTube" },
  { icon: Cloud, label: "SoundCloud" },
];

export function Brands() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="brands" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] divide-border lg:grid-cols-3 lg:divide-x">
        {/* InkNior */}
        <article id="inknior" className="panel flex flex-col p-8 text-center">
          <h2 className="metal-text text-3xl">InkNior</h2>
          <p className="label-xs mt-2">Tattoo Identity</p>
          <ul className="mt-10 grid grid-cols-4 gap-3">
            {INK_SERVICES.map(({ icon: Icon, label }) => (
              <li key={label} className="grid justify-items-center gap-2">
                <Icon className="size-5 text-silver/80" />
                <span className="label-xs text-[0.55rem]">{label}</span>
              </li>
            ))}
          </ul>
          <a
            href="#booking"
            className="mt-auto block border border-royal/50 bg-royal/15 px-6 py-3 text-[0.66rem] tracking-[0.24em] uppercase transition-colors hover:bg-royal/35"
          >
            Book Your Session
          </a>
          <p className="label-xs mt-3 text-[0.55rem]">Consultation • Deposit • Confirm</p>
        </article>

        {/* OnixBlvck */}
        <article id="onixblvck" className="panel flex flex-col p-8 text-center">
          <h2 className="metal-text text-3xl">OnixBlvck</h2>
          <p className="label-xs mt-2">Music Identity</p>
          <p className="label-xs mt-10 text-royal">Latest Release</p>
          <p className="display mt-2 text-lg tracking-[0.12em] text-silver">Scars &amp; Symbols</p>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              aria-label={playing ? "Pause preview" : "Play preview"}
              onClick={() => setPlaying((v) => !v)}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-royal/60 bg-royal/20 transition-colors hover:bg-royal/40"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <span className="text-[0.6rem] text-muted-foreground">0:00</span>
            <div className="h-[2px] flex-1 bg-border">
              <div className={`h-full bg-royal ${playing ? "w-1/3" : "w-0"} transition-all duration-700`} />
            </div>
            <span className="text-[0.6rem] text-muted-foreground">2:12</span>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STREAMS.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="flex items-center justify-center gap-1 border border-border bg-secondary/60 px-2 py-2 text-[0.55rem] tracking-[0.12em] uppercase">
                  <Icon className="size-3" /> {label}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="#portfolio"
            className="mt-auto block border border-royal/50 bg-royal/15 px-6 py-3 text-[0.66rem] tracking-[0.24em] uppercase transition-colors hover:bg-royal/35"
          >
            Listen Now
          </a>
        </article>

        {/* FastCutEdits */}
        <article id="fastcutedits" className="panel flex flex-col p-8 text-center">
          <h2 className="metal-text text-3xl">FastCutEdits</h2>
          <p className="label-xs mt-2">Visual Identity</p>
          <ul className="mt-10 grid grid-cols-4 gap-3">
            {FCE_SERVICES.map(({ icon: Icon, label }) => (
              <li key={label} className="grid justify-items-center gap-2">
                <Icon className="size-5 text-silver/80" />
                <span className="label-xs text-[0.55rem]">{label}</span>
              </li>
            ))}
          </ul>
          <a
            href="#pricing"
            className="mt-auto block border border-royal/50 bg-royal/15 px-6 py-3 text-[0.66rem] tracking-[0.24em] uppercase transition-colors hover:bg-royal/35"
          >
            View Services
          </a>
        </article>
      </div>
    </section>
  );
}
