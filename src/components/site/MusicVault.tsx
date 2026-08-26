import { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ListMusic,
  ExternalLink,
} from "lucide-react";
import { tracks, BANDLAB_URL, type Track } from "@/data/music";

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicVault() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const current: Track = tracks[index]!;
  const hasAudio = Boolean(current.audioUrl);
  const duration = 0;

  const go = (next: number) => {
    setIndex((next + tracks.length) % tracks.length);
    setPosition(0);
    setPlaying(false);
  };

  const onPlay = () => {
    if (!hasAudio) {
      window.open(current.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.pause();
    else void el.play();
    setPlaying(!playing);
  };

  return (
    <section id="music" className="border-b border-border bg-ink/80">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <p className="label-xs text-royal">OnixBlvck</p>
        <h2 className="metal-text mt-2 text-3xl">The Music Vault</h2>
        <p className="mt-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Every scar has a sound.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {/* Main player */}
          <article className="panel p-6">
            <div className="flex flex-wrap items-center gap-5">
              <img
                src={current.cover}
                alt={`${current.title} cover art`}
                loading="lazy"
                className="size-28 border border-border object-cover"
              />
              <div className="min-w-[160px] flex-1">
                <p className="display text-lg tracking-[0.14em] text-silver">{current.title}</p>
                <p className="label-xs mt-1 text-[0.58rem]">{current.artist}</p>
                <p className="label-xs mt-1 text-[0.55rem] text-royal">{current.project}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="w-9 text-[0.6rem] text-muted-foreground">{fmt(position)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={position}
                disabled={!hasAudio}
                aria-label="Seek"
                onChange={(e) => setPosition(Number(e.target.value))}
                className="h-[2px] flex-1 appearance-none bg-border accent-royal disabled:opacity-40"
              />
              <span className="w-9 text-right text-[0.6rem] text-muted-foreground">
                {hasAudio ? fmt(duration) : "--:--"}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-4 text-foreground/70">
                <button type="button" aria-label="Previous track" onClick={() => go(index - 1)}>
                  <SkipBack className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={hasAudio ? (playing ? "Pause" : "Play") : "Listen on BandLab"}
                  onClick={onPlay}
                  className="grid size-11 place-items-center rounded-full border border-royal/60 bg-royal/30 text-foreground transition-colors hover:bg-royal/50"
                >
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
                <button type="button" aria-label="Next track" onClick={() => go(index + 1)}>
                  <SkipForward className="size-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-foreground/70">
                <Volume2 className="size-4" aria-hidden />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  aria-label="Volume"
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="h-[2px] w-24 appearance-none bg-border accent-royal"
                />
              </div>

              <a
                href={current.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 border border-royal/50 bg-royal/15 px-5 py-2 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35"
              >
                Listen on BandLab <ExternalLink className="size-3" />
              </a>
            </div>

            {!hasAudio && (
              <p className="label-xs mt-4 text-[0.55rem] text-gold/80">
                Playback is hosted on BandLab until audio files are uploaded to the vault.
              </p>
            )}

            {current.audioUrl && (
              <audio ref={audioRef} src={current.audioUrl} preload="none" />
            )}
          </article>

          {/* Queue / library */}
          <article className="panel p-6">
            <p className="label-xs flex items-center gap-2 text-royal">
              <ListMusic className="size-3" /> Queue
            </p>
            <ul className="mt-4 grid gap-2">
              {tracks.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === index}
                    className={`flex w-full items-center gap-3 border px-3 py-2 text-left transition-colors ${
                      i === index
                        ? "border-royal/60 bg-royal/20"
                        : "border-border bg-secondary/40 hover:bg-secondary"
                    }`}
                  >
                    <img
                      src={t.cover}
                      alt=""
                      loading="lazy"
                      className="size-10 border border-border object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.68rem] tracking-[0.14em] text-silver">
                        {t.title}
                      </span>
                      <span className="label-xs block text-[0.5rem]">{t.project}</span>
                    </span>
                    {i === index && <span className="size-1.5 rounded-full bg-royal" />}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={BANDLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block border border-border bg-secondary/50 px-6 py-3 text-center text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-secondary"
            >
              Open the full vault
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
