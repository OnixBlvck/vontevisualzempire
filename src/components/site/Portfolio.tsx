import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { works, type Work } from "@/data/portfolio";

const FILTERS = ["All", "Cover Art", "Flyer", "Video", "Logo"] as const;

export function Portfolio({
  openId,
  onOpen,
}: {
  openId: string | null;
  onOpen: (id: string | null) => void;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = useMemo(
    () => (filter === "All" ? works : works.filter((w) => w.category === filter)),
    [filter],
  );
  const active: Work | null = openId ? works.find((w) => w.id === openId) ?? null : null;

  return (
    <section id="portfolio" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-xs text-royal">Portfolio</p>
            <h2 className="metal-text mt-2 text-3xl">The Work</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`border px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase transition-colors ${
                  filter === f
                    ? "border-royal/70 bg-royal/25 text-foreground"
                    : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => onOpen(w.id)}
              className="group panel overflow-hidden text-left"
            >
              <div className="overflow-hidden">
                <img
                  src={w.src}
                  alt={`${w.title} — ${w.category} by ${w.brand}`}
                  loading="lazy"
                  style={{ aspectRatio: w.ratio }}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <span className="text-[0.65rem] tracking-[0.16em] uppercase text-silver">
                  {w.title}
                </span>
                <span className="label-xs text-[0.5rem]">{w.brand}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => onOpen(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/95 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpen(null)}
            className="absolute right-4 top-4 p-2 text-foreground/70 hover:text-foreground"
          >
            <X className="size-6" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-[88vh] w-full max-w-4xl">
            <img
              src={active.src}
              alt={`${active.title} — ${active.category} by ${active.brand}`}
              className="max-h-[76vh] w-full object-contain"
            />
            <figcaption className="mt-4 text-center">
              <p className="display text-sm tracking-[0.18em] text-silver">{active.title}</p>
              <p className="label-xs mt-1">
                {active.category} • {active.brand}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
