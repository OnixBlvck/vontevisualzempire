import { Check } from "lucide-react";

const SERVICES = [
  {
    brand: "InkNior",
    tag: "Tattoo Artistry",
    items: ["Blackwork", "Realism", "Lettering", "Custom"],
    note: "$30 deposit to secure your time",
  },
  {
    brand: "Onyx Blvck",
    tag: "Music Identity",
    items: ["Releases", "Cover Art", "Visual Rollout", "Artist Branding"],
    note: "Inquire for project scope",
  },
  {
    brand: "FastCutEdits",
    tag: "Visual Identity",
    items: ["Video Editing", "Graphic Design", "Branding", "Cover Art"],
    note: "Inquire for project scope",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <p className="label-xs text-royal">Pricing</p>
        <h2 className="metal-text mt-2 text-3xl">Services</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.brand} className="panel p-8">
              <h3 className="display text-xl tracking-[0.12em] text-silver">{s.brand}</h3>
              <p className="label-xs mt-2">{s.tag}</p>
              <ul className="mt-6 grid gap-2">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[0.68rem] tracking-[0.14em] uppercase text-muted-foreground"
                  >
                    <Check className="size-3 text-royal" /> {i}
                  </li>
                ))}
              </ul>
              <p className="label-xs mt-6 text-[0.55rem] text-gold">{s.note}</p>
              <a
                href="#contact"
                className="mt-6 block border border-royal/50 bg-royal/15 px-6 py-3 text-center text-[0.66rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35"
              >
                Book Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
