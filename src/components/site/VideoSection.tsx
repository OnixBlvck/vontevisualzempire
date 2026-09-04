import { useRef } from "react";
import vidOnix from "@/assets/video-onixblvck.mp4.asset.json";
import vidFast from "@/assets/video-fastcutedits.mp4.asset.json";
import vidInk from "@/assets/video-inknior.mp4.asset.json";
import posterMusic from "@/assets/panel-music.jpg.asset.json";
import posterDesign from "@/assets/panel-design.jpg.asset.json";
import posterTattoo from "@/assets/panel-tattoo.jpg.asset.json";

const REELS = [
  {
    id: "reel-onixblvck",
    brand: "OnixBlvck",
    tag: "Music / Artist Identity",
    src: vidOnix.url,
    poster: posterMusic.url,
  },
  {
    id: "reel-fastcutedits",
    brand: "FastCutEdits",
    tag: "Graphic Design / Visual Identity",
    src: vidFast.url,
    poster: posterDesign.url,
  },
  {
    id: "reel-inknior",
    brand: "InkNior",
    tag: "Tattoo / Permanent Identity",
    src: vidInk.url,
    poster: posterTattoo.url,
  },
];

export function VideoSection() {
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  return (
    <section id="video" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label-xs text-royal">Demo Reels</p>
            <h2 className="metal-text mt-2 text-2xl sm:text-3xl">Video</h2>
          </div>
          <p className="max-w-[42ch] text-xs leading-relaxed text-muted-foreground">
            Short cinematic reels from each side of the empire — music, design and ink.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {REELS.map((r) => (
            <figure key={r.id} id={r.id} className="panel overflow-hidden">
              <video
                ref={(el) => {
                  refs.current[r.id] = el;
                }}
                src={r.src}
                poster={r.poster}
                controls
                playsInline
                preload="metadata"
                onPlay={() => {
                  for (const [id, el] of Object.entries(refs.current)) {
                    if (id !== r.id && el && !el.paused) el.pause();
                  }
                }}
                className="aspect-video w-full bg-ink object-cover"
              >
                <track kind="captions" />
              </video>
              <figcaption className="p-4">
                <p className="metal-text text-lg">{r.brand}</p>
                <p className="label-xs mt-1 text-[0.55rem]">{r.tag}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
