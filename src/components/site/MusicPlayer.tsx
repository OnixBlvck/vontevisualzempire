import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { tracks, BANDLAB_URL } from "@/data/music";

function fmt(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const track = tracks[0]!;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (el) {
      el.volume = volume;
      el.muted = muted;
    }
  }, [volume, muted]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  const progress = duration ? (position / duration) * 100 : 0;

  return (
    <div id="music" className="relative mx-auto w-full max-w-[560px]">
      <div className="relative border border-royal/30 bg-ink/70 p-4 backdrop-blur-md sm:p-5">
        <p className="label-xs text-[0.5rem] text-royal">Now Playing — The Music Vault</p>

        <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          {/* Rose artwork is the player face */}
          <div className="relative grid size-24 shrink-0 place-items-center sm:size-28">
            <img
              src={track.cover}
              alt="Black rose player artwork"
              width={700}
              height={700}
              className="absolute inset-0 size-full rounded-full object-cover opacity-90"
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(color-mix(in oklab, var(--royal) 85%, transparent) ${progress}%, transparent ${progress}% 100%)`,
                mask: "radial-gradient(circle, transparent 62%, black 64%)",
                WebkitMask: "radial-gradient(circle, transparent 62%, black 64%)",
              }}
              aria-hidden
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause Pop My Shit" : "Play Pop My Shit"}
              className="relative grid size-11 place-items-center rounded-full border border-gold/50 bg-ink/70 text-foreground transition-colors hover:bg-royal/40"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          </div>

          <div className="min-w-0">
            <p className="display truncate text-base tracking-[0.14em] text-silver sm:text-lg">
              Pop My Shit
            </p>
            <p className="label-xs mt-1 text-[0.55rem] text-gold/90">Onyx Blvck</p>

            <div className="mt-3 flex items-center gap-2">
              <span className="w-8 text-[0.55rem] text-muted-foreground">{fmt(position)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={position}
                aria-label="Seek"
                onChange={(e) => {
                  const el = audioRef.current;
                  const next = Number(e.target.value);
                  setPosition(next);
                  if (el) el.currentTime = next;
                }}
                className="h-[2px] flex-1 appearance-none bg-border accent-royal"
              />
              <span className="w-8 text-right text-[0.55rem] text-muted-foreground">
                {fmt(duration)}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="text-foreground/70 transition-colors hover:text-royal"
              >
                {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                aria-label="Volume"
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(false);
                }}
                className="h-[2px] w-20 appearance-none bg-border accent-royal"
              />
              <a
                href={BANDLAB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                BandLab <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={track.audioUrl}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setPosition(0);
          }}
        />
      </div>
    </div>
  );
}
