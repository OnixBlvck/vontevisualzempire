import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Brands } from "@/components/site/Brands";
import { MidRow } from "@/components/site/MidRow";
import { FeatureStrip } from "@/components/site/FeatureStrip";
import { About } from "@/components/site/About";
import { NowPlaying } from "@/components/site/NowPlaying";
import { Portfolio } from "@/components/site/Portfolio";
import { Pricing } from "@/components/site/Pricing";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VonteVisuals | Tattoos, Music & Design Creative Empire" },
      {
        name: "description",
        content:
          "VonteVisuals is the creative empire behind InkNior tattoo artistry, OnixBlvck music, and FastCutEdits design. From scars to symbols — book your session.",
      },
      { property: "og:title", content: "VonteVisuals | Creative Empire" },
      {
        property: "og:description",
        content:
          "InkNior tattoos, OnixBlvck music, FastCutEdits design. Every story deserves to be seen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Brands />
        <MidRow onOpen={setOpenId} />
        <FeatureStrip />
        <About />
        <NowPlaying />
        <Portfolio openId={openId} onOpen={setOpenId} />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
