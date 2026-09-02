import { Link } from "@tanstack/react-router";
import { works } from "@/data/portfolio";

export function PortfolioStrip() {
  const strip = works.slice(0, 6);

  return (
    <section id="portfolio" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="label-xs text-royal">Portfolio</p>
            <h2 className="metal-text mt-1 truncate text-2xl">The Work</h2>
          </div>
          <Link
            to="/portfolio"
            className="shrink-0 border border-royal/50 bg-royal/15 px-5 py-2 text-[0.6rem] tracking-[0.2em] uppercase transition-colors hover:bg-royal/35"
          >
            View Full Portfolio →
          </Link>
        </div>

        <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {strip.map((w) => (
            <li key={w.id}>
              <Link to="/portfolio" className="block overflow-hidden border border-border">
                <img
                  src={w.src}
                  alt={`${w.title} — ${w.category} by ${w.brand}`}
                  loading="lazy"
                  className="aspect-square size-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
