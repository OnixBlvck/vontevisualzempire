import foundationPortrait from "@/assets/foundation-portrait.jpg.asset.json";
import kids from "@/assets/kids.jpg.asset.json";
import blackRose from "@/assets/black-rose-ash.jpg";

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 lg:grid-cols-3 lg:px-8">
        {/* Foundation */}
        <div>
          <p className="label-xs text-royal">Foundation</p>
          <h2 className="metal-text mt-2 text-2xl">Built From Pain. Created With Purpose.</h2>
          <img
            src={blackRose}
            alt="Black rose rising from ash"
            loading="lazy"
            className="mt-5 h-40 w-full border border-border object-cover opacity-80"
          />
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            VonteVisualz wasn't built from comfort. It was built from everything that had to be
            survived first. Every piece of art, every song, every design carries that weight —
            proof that pain can be turned into something permanent.
          </p>
          <p className="label-xs mt-5 text-[0.55rem] text-gold">
            Onix Comes First. Then Comes The Empire.
          </p>
        </div>

        {/* OnixBlvck story */}
        <div id="onixblvck-story">
          <p className="label-xs text-royal">OnixBlvck</p>
          <h2 className="metal-text mt-2 text-2xl">The Story</h2>
          <img
            src={foundationPortrait.url}
            alt="OnixBlvck portrait"
            loading="lazy"
            className="mt-5 h-40 w-full border border-border object-cover"
          />
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            OnixBlvck is the sound of real life — loss, loyalty, pressure, and everything learned
            the hard way. The songs aren't written to trend; they're written so the story survives
            longer than the moment that made it.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Scars tell stories, but beauty is pain. That line is the whole catalog.
          </p>
        </div>

        {/* Message to my kids */}
        <div>
          <p className="label-xs text-royal">Message To My Kids</p>
          <h2 className="metal-text mt-2 text-2xl">For You</h2>
          <img
            src={kids.url}
            alt="Family portrait"
            loading="lazy"
            className="mt-5 h-40 w-full border border-border object-cover"
          />
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Everything here is for you. Every late night, every design, every song, every hour in
            the chair — it's all so you never have to start from nothing. Build with intention,
            protect your name, and never let anyone tell you what your story is worth.
          </p>
        </div>
      </div>
    </section>
  );
}
