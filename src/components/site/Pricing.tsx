import { Check } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { BUSINESS_LABELS, formatDeposit, servicesFor, type BusinessId } from "@/lib/site-content";

const CARDS: { business: BusinessId; tag: string }[] = [
  { business: "inknior", tag: "Tattoo Artistry" },
  { business: "onyxblvck", tag: "Music Identity" },
  { business: "fastcutedits", tag: "Visual Identity" },
];

export function Pricing() {
  const { services, settings, loadError } = useSiteContent();
  const deposit = formatDeposit(settings.inknior_deposit_cents);

  return (
    <section id="pricing" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <p className="label-xs text-royal">Pricing</p>
        <h2 className="metal-text mt-2 text-3xl">Services</h2>
        {loadError && (
          <p role="alert" className="mt-4 text-xs text-muted-foreground">
            Prices couldn't load right now. Please refresh, or contact me for current pricing.
          </p>
        )}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {CARDS.map((card) => {
            const items = servicesFor(services, card.business);
            return (
              <article key={card.business} className="panel p-8">
                <h3 className="display text-xl tracking-[0.12em] text-silver">
                  {BUSINESS_LABELS[card.business]}
                </h3>
                <p className="label-xs mt-2">{card.tag}</p>
                <ul className="mt-6 grid gap-2">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 text-[0.68rem] tracking-[0.14em] uppercase text-muted-foreground"
                    >
                      <Check className="size-3 shrink-0 text-royal" />
                      <span className="flex-1">{item.name}</span>
                      <span className="text-silver">{item.price_label}</span>
                    </li>
                  ))}
                </ul>
                <p className="label-xs mt-6 text-[0.55rem] text-gold">
                  {card.business === "inknior" && deposit
                    ? `${deposit} deposit paid with your request`
                    : "Final quote after review"}
                </p>
                <a
                  href="/#booking"
                  className="mt-6 block border border-royal/50 bg-royal/15 px-6 py-3 text-center text-[0.66rem] tracking-[0.22em] uppercase transition-colors hover:bg-royal/35"
                >
                  Book Now
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
