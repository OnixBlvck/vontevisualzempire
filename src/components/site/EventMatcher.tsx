import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recommendBusiness, type Recommendation } from "@/lib/recommend.functions";

const NAMES: Record<Recommendation["business"], string> = {
  inknior: "InkNior",
  onyxblvck: "Onyx Blvck",
  fastcutedits: "FastCutEdits",
};

export function EventMatcher() {
  const recommend = useServerFn(recommendBusiness);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Recommendation | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      setResult(await recommend({ data: { description } }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not get a recommendation.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="match" className="border-t border-border/40 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="label-xs text-royal">Find Your Fit</p>
        <h2 className="metal-text mt-2 text-2xl">Describe Your Event</h2>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Tell me what you're planning and get a suggestion for InkNior, Onyx Blvck, or FastCutEdits.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
          <label className="sr-only" htmlFor="event-description">
            Event description
          </label>
          <textarea
            id="event-description"
            required
            minLength={10}
            maxLength={1000}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Album release party next month, need promo flyers and cover art"
            className="border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-royal"
          />
          <button
            type="submit"
            disabled={busy}
            className="border border-royal/60 bg-royal/25 px-5 py-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/45 disabled:opacity-60"
          >
            {busy ? "Thinking…" : "Get Recommendation"}
          </button>
        </form>
        {error && (
          <p role="alert" className="mt-4 text-xs text-destructive">
            {error}
          </p>
        )}
        {result && (
          <div aria-live="polite" className="mt-6 border border-border/60 bg-card/40 p-5">
            <p className="label-xs text-royal">{NAMES[result.business]}</p>
            <h3 className="mt-2 text-lg">{result.headline}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{result.reason}</p>
            {result.suggested_services.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {result.suggested_services.map((s) => (
                  <li key={s} className="border border-border/60 px-2 py-1 text-[0.6rem] uppercase tracking-[0.15em]">
                    {s}
                  </li>
                ))}
              </ul>
            )}
            <a
              href="#booking"
              className="mt-4 inline-block text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
            >
              Request a booking →
            </a>
            <p className="mt-3 text-[0.55rem] text-muted-foreground">
              AI suggestion only — final details are confirmed after review.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
