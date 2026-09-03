import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Portfolio } from "@/components/site/Portfolio";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | VonteVisuals Cover Art, Flyers & Video" },
      {
        name: "description",
        content:
          "Browse the VonteVisuals portfolio — OnixBlvck cover art, InkNior flyers, FastCutEdits video work and brand logos.",
      },
      { property: "og:title", content: "Portfolio | VonteVisuals" },
      {
        property: "og:description",
        content: "Cover art, flyers, video stills and logos from the VonteVisuals empire.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Portfolio openId={openId} onOpen={setOpenId} />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
