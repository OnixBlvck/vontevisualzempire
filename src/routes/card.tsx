import { createFileRoute } from "@tanstack/react-router";
import { DigitalCard } from "@/components/site/DigitalCard";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/card")({
  head: () => ({
    meta: [
      { title: "Digital Business Card | VonteVisualz" },
      {
        name: "description",
        content: "VonteVisualz creative empire - Digital Business Card for Da'zson Bolding.",
      },
    ],
  }),
  component: CardPage,
});

function CardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex min-h-[calc(100-100px)] items-center justify-center px-4 py-20">
        <div className="w-full max-w-sm">
          <DigitalCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
