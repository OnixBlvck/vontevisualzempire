import titleEmblem from "@/assets/title-emblem.png.asset.json";
import heroLogo from "@/assets/hero-logo.png.asset.json";

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 lg:grid-cols-[1fr_1.1fr_0.8fr]">
        <div className="night-sky flex items-center justify-center border-b border-border p-8 lg:border-b-0 lg:border-r">
          <img
            src={heroLogo.url}
            alt="VonteVisuals raven emblem"
            className="w-full max-w-[320px] object-contain"
          />
        </div>

        <div className="panel p-8">
          <p className="label-xs text-royal">The Story Behind VonteVisuals</p>
          <div className="mt-4 space-y-4 text-xs leading-relaxed text-muted-foreground">
            <p>
              I'm Da'zson Bolding, born December 11th, 1994 at 5:00 AM in Houston, Texas. I'm a
              father of 4 and the mind behind VonteVisuals.
            </p>
            <p>I built this empire from nothing. No handouts. Just pain, purpose, and vision.</p>
            <p>Music saved me. Art healed me. My kids keep me going.</p>
            <p>I don't just make music or tattoos— I build identities.</p>
          </div>

          <p className="label-xs mt-8 text-royal">Message To My Kids</p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            One day y'all going to understand why I had to grind so hard. I did it all for y'all.
            Everything I build, I build for our future. Remember: stay solid, stay humble, and never
            forget who you are.
          </p>
        </div>

        <div className="night-sky flex items-center justify-center border-t border-border p-8 lg:border-l lg:border-t-0">
          <img
            src={titleEmblem.url}
            alt="VonteVisuals thorn rose emblem"
            className="w-full max-w-[280px] mix-blend-screen object-contain"
          />
        </div>
      </div>
    </section>
  );
}
