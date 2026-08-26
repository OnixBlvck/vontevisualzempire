import { Quote, Star, ChevronRight } from "lucide-react";
import { works } from "@/data/portfolio";

const STEPS = [
  "Choose your service",
  "Submit your vision",
  "Pick your date & time",
  "Secure with deposit",
  "We bring your vision to life",
];

export function MidRow({ onOpen }: { onOpen: (id: string) => void }) {
  const featured = works.slice(0, 4);

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] divide-border lg:grid-cols-[1fr_1.1fr_1fr] lg:divide-x">
        {/* Featured work */}
        <div className="panel p-6">
          <p className="label-xs text-royal">Featured Work</p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {featured.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => onOpen(w.id)}
                className="group overflow-hidden border border-border"
                aria-label={`View ${w.title}`}
              >
                <img
                  src={w.src}
                  alt={w.title}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
          <p className="label-xs mt-6 text-[0.58rem]">
            Tattoo • Music • Design • Video • Branding
          </p>
        </div>

        {/* The story */}
        <div className="panel p-6">
          <p className="label-xs text-royal">The Story</p>
          <h2 className="mt-3 text-xl leading-snug text-silver">
            This isn't just a brand.
            <br />
            It's a <span className="text-royal">movement.</span>
          </h2>
          <div className="mt-4 space-y-1 text-xs leading-relaxed text-muted-foreground">
            <p>VonteVisuals was built from the dark—</p>
            <p>from pain, mistakes, and everything I had to survive.</p>
            <p>Art saved me. Creating saved me.</p>
            <p>Now I use every scar as fuel</p>
            <p>to help others turn their pain into power.</p>
            <p>We don't hide our stories...</p>
            <p>We turn them into symbols.</p>
          </div>
          <a
            href="#about"
            className="mt-6 inline-block border border-border bg-secondary/60 px-6 py-3 text-[0.66rem] tracking-[0.22em] uppercase transition-colors hover:bg-secondary"
          >
            Read My Story
          </a>
        </div>

        {/* Testimonial + booking */}
        <div className="grid divide-y divide-border">
          <div className="panel p-6">
            <p className="label-xs text-royal">Client Testimonials</p>
            <Quote className="mt-3 size-4 text-royal" />
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              VonteVisuals took my vision and turned it into something bigger than I imagined. He
              doesn't just create... he builds your identity.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full border border-border bg-secondary text-[0.6rem] text-silver">
                JT
              </span>
              <div>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-silver">Jay T.</p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="booking" className="panel p-6">
            <p className="label-xs text-royal">Book Your Appointment</p>
            <ul className="mt-4 grid gap-2">
              {STEPS.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground">
                  <ChevronRight className="size-3 text-royal" /> {s}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-5 block border border-royal/60 bg-royal/25 px-6 py-3 text-center text-[0.68rem] tracking-[0.24em] uppercase transition-colors hover:bg-royal/45"
            >
              Book Now
            </a>
            <p className="label-xs mt-2 text-center text-[0.55rem]">
              $30 deposit to secure time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
