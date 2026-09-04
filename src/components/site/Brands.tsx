import { Instagram } from "lucide-react";
import panelTattoo from "@/assets/panel-tattoo.jpg.asset.json";
import panelDesign from "@/assets/panel-design.jpg.asset.json";
import panelMusic from "@/assets/panel-music.jpg.asset.json";

const PANELS: {
  id: string;
  name: string;
  tag: string;
  body: string;
  cta: string;
  href: string;
  bg: string;
  ig: string;
  igUrl: string;
}[] = [
  {
    id: "inknior",
    name: "InkNior",
    tag: "Tattoo / Permanent Identity",
    body: "Blackwork, realism, lettering and custom pieces. Ink that carries a story instead of a trend.",
    cta: "View Tattoos",
    href: "#pricing",
    bg: panelTattoo.url,
    ig: "@inknior",
    igUrl: "https://www.instagram.com/inknior/",
  },
  {
    id: "fastcutedits",
    name: "FastCutEdits",
    tag: "Graphic Design / Visual Identity",
    body: "Branding, cover art, promo graphics and video edits built to make the work impossible to ignore.",
    cta: "View Work",
    href: "/portfolio",
    bg: panelDesign.url,
    ig: "@fast.cuteditz",
    igUrl: "https://www.instagram.com/fast.cuteditz/",
  },
  {
    id: "onixblvck",
    name: "OnixBlvck",
    tag: "Music / Artist Identity",
    body: "Songs written from real life. Every scar has a sound, and the vault keeps every one of them.",
    cta: "Enter the Vault",
    href: "#music",
    bg: panelMusic.url,
    ig: "@iamonixblvck",
    igUrl: "https://www.instagram.com/iamonixblvck/",
  },
];

export function Brands() {
  return (
    <section id="brands" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] divide-border lg:grid-cols-3 lg:divide-x">
        {PANELS.map((p) => (
          <article
            key={p.id}
            id={p.id}
            className="relative flex flex-col overflow-hidden border-b border-border p-7 text-center lg:border-b-0"
          >
            <img
              src={p.bg}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-ink/70" aria-hidden />
            <div className="relative flex flex-1 flex-col">
              <h2 className="metal-text text-2xl sm:text-3xl">{p.name}</h2>
              <p className="label-xs mt-2 text-[0.55rem]">{p.tag}</p>
              <p className="mx-auto mt-5 max-w-[34ch] text-xs leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <a
                href={p.igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-5 inline-flex min-h-11 items-center gap-2 border border-border bg-secondary/50 px-4 text-[0.6rem] tracking-[0.2em] uppercase text-silver transition-colors hover:border-royal/60 hover:text-foreground"
              >
                <Instagram className="size-4" />
                {p.ig}
              </a>
              <a
                href={p.href}
                className="mt-6 inline-block border border-royal/50 bg-royal/15 px-6 py-3 text-[0.62rem] tracking-[0.24em] uppercase transition-colors hover:bg-royal/35"
              >
                {p.cta} →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
