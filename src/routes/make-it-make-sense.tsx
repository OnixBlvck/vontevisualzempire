import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

// Provisional target supplied by the owner; change only when a newer approved date exists.
const TARGET_RELEASE = "January 15, 2027";

// Only sections are listed here. Episode, character and trailer content is added once approved for public viewing.
const SECTIONS = [
  "Series Overview",
  "Episodes",
  "Characters",
  "Trailers & Teasers",
  "Release Updates",
];

export const Route = createFileRoute("/make-it-make-sense")({
  head: () => ({
    meta: [
      { title: "Make It Make Sense | VonteVisualz Original Series" },
      {
        name: "description",
        content: `Make It Make Sense is an original animation and storytelling series from VonteVisualz. Target release ${TARGET_RELEASE}.`,
      },
      { property: "og:title", content: "Make It Make Sense | VonteVisualz" },
      {
        property: "og:description",
        content: `An original animation and storytelling series from VonteVisualz. Target release ${TARGET_RELEASE}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MakeItMakeSensePage,
});

function MakeItMakeSensePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-20 lg:px-8">
        <p className="label-xs text-royal">Original Series</p>
        <h1 className="metal-text display mt-3 text-4xl sm:text-5xl">Make It Make Sense</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          An original animation and storytelling project from VonteVisualz.
        </p>
        <p className="mt-6 text-[0.65rem] tracking-[0.22em] uppercase text-gold">
          Target release: {TARGET_RELEASE} (provisional)
        </p>

        <ul className="mt-10 grid gap-3">
          {SECTIONS.map((section) => (
            <li key={section} className="panel flex items-center justify-between gap-4 px-5 py-4">
              <span className="text-xs tracking-[0.16em] uppercase text-foreground">{section}</span>
              <span className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground">
                Not announced yet
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Episodes, characters, trailers and release news will appear here once they are approved
          for public viewing.
        </p>
      </main>
      <Footer />
    </div>
  );
}
