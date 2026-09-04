import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Brands } from "@/components/site/Brands";
import { PortfolioStrip } from "@/components/site/PortfolioStrip";
import { VideoSection } from "@/components/site/VideoSection";
import { About } from "@/components/site/About";
import { Pricing } from "@/components/site/Pricing";
import { AppSection } from "@/components/site/AppSection";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VonteVisualz | Tattoos, Music & Design Creative Empire" },
      {
        name: "description",
        content:
          "VonteVisualz is the creative empire behind InkNior tattoo artistry, OnixBlvck music, and FastCutEdits design. Book your session in Houston, Texas.",
      },
      { property: "og:title", content: "VonteVisualz | Creative Empire" },
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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Brands />
        <PortfolioStrip />
        <VideoSection />
        <About />
        <Pricing />
        <AppSection />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
