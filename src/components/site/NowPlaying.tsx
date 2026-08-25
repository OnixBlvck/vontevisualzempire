import { useState } from "react";
import {
  Play,
  Pause,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  ListMusic,
} from "lucide-react";
import cover from "@/assets/cover-pain-made-me.jpg.asset.json";

export function NowPlaying() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="border-b border-border bg-ink/80">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-6 px-4 py-5 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src={cover.url}
            alt="Pain Made Me cover art"
            className="size-12 border border-border object-cover"
          />
          <div>
            <p className="text-xs tracking-[0.14em] text-silver">Pain Made Me</p>
            <p className="label-xs text-[0.55rem]">OnixBlvck</p>
          </div>
        </div>

        <div className="flex min-w-[180px] flex-1 items-center gap-3">
          <span className="text-[0.6rem] text-muted-foreground">00:45</span>
          <div className="h-[2px] flex-1 bg-border">
            <div className="h-full w-1/4 bg-royal" />
          </div>
          <span className="text-[0.6rem] text-muted-foreground">03:21</span>
        </div>

        <div className="flex items-center gap-4 text-foreground/70">
          <Shuffle className="size-4" aria-hidden />
          <SkipBack className="size-4" aria-hidden />
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-royal/60 bg-royal/30 text-foreground transition-colors hover:bg-royal/50"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <SkipForward className="size-4" aria-hidden />
          <Repeat className="size-4" aria-hidden />
        </div>

        <div className="flex items-center gap-3 text-foreground/70">
          <Volume2 className="size-4" aria-hidden />
          <div className="h-[2px] w-24 bg-border">
            <div className="h-full w-2/3 bg-royal" />
          </div>
          <ListMusic className="size-4" aria-hidden />
        </div>
      </div>
    </section>
  );
}
