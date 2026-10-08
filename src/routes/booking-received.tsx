import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/booking-received")({
  head: () => ({
    meta: [
      { title: "Request Received | VonteVisualz" },
      { name: "description", content: "Thank you for your VonteVisualz booking request. It's under review." },
      { property: "og:title", content: "Request Received | VonteVisualz" },
      { property: "og:description", content: "Your VonteVisualz booking request is under review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingReceived,
});

function BookingReceived() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative px-4 py-24">
        <div className="night-sky absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-lg border border-border bg-card/40 p-8 text-center">
          <p className="label-xs text-royal">Request Received</p>
          <h1 className="metal-text mt-3 text-3xl">Thank You</h1>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Your request is in my inbox. I review every request personally and will reply by email.
            Nothing is confirmed until I reply and any deposit is arranged.
          </p>
          <p className="mt-4 text-[0.6rem] tracking-[0.28em] uppercase text-gold/90">
            Your story. Your identity. Your vision.
          </p>
          <ul className="mt-6 grid gap-2 text-xs">
            <li>
              <a href="tel:+18325997747" className="hover:text-royal">(832) 599-7747</a>
            </li>
            <li>
              <a href="mailto:VONTEVISUALZ@GMAIL.COM" className="hover:text-royal">VONTEVISUALZ@GMAIL.COM</a>
            </li>
            <li>
              <a href="https://vontevisualz.com" className="hover:text-royal">vontevisualz.com</a>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/inbox" className="border border-royal/60 bg-royal/25 px-5 py-3 text-[0.62rem] tracking-[0.22em] uppercase hover:bg-royal/45">
              View My Requests
            </Link>
            <Link to="/" className="border border-border px-5 py-3 text-[0.62rem] tracking-[0.22em] uppercase hover:border-royal/60">
              Back Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
