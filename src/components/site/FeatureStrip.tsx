import {
  Gem,
  Smartphone,
  ShieldCheck,
  Gauge,
  Search,
  Settings2,
  CreditCard,
  CalendarCheck,
  Sparkles,
  LifeBuoy,
} from "lucide-react";

const ITEMS = [
  { icon: Gem, title: "Premium Quality", sub: "Design & Code" },
  { icon: Smartphone, title: "Fully Responsive", sub: "All Devices" },
  { icon: ShieldCheck, title: "Secure & Reliable", sub: "Data Protection" },
  { icon: Gauge, title: "Fast Performance", sub: "Optimized Speed" },
  { icon: Search, title: "SEO Optimized", sub: "Higher Rankings" },
  { icon: Settings2, title: "Easy To Manage", sub: "Client Friendly" },
  { icon: CreditCard, title: "Payment Integration", sub: "Multiple Options" },
  { icon: CalendarCheck, title: "Booking System", sub: "Calendly Integrated" },
  { icon: Sparkles, title: "AI Identity Generator", sub: "Smart & Powerful" },
  { icon: LifeBuoy, title: "Lifetime Support", sub: "We Empire." },
];

export function FeatureStrip() {
  return (
    <section className="border-b border-border bg-ink/70">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-4 gap-y-5 px-4 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:px-8 xl:grid-cols-10">
        {ITEMS.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-2">
            <Icon className="size-4 shrink-0 text-royal" />
            <div>
              <p className="text-[0.55rem] tracking-[0.16em] uppercase text-silver">{title}</p>
              <p className="text-[0.5rem] tracking-[0.16em] uppercase text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
