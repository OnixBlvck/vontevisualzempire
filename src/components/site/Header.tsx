import { useState } from "react";
import { Menu, X } from "lucide-react";
import titleLogo from "@/assets/title-logo.png.asset.json";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "OnixBlvck", href: "#onixblvck" },
  { label: "InkNior", href: "#inknior" },
  { label: "FastCutEdits", href: "#fastcutedits" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Booking", href: "#booking" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-4 py-3 lg:px-8">
        <a href="#home" className="flex shrink-0 items-center gap-2">
          <img src={titleLogo.url} alt="VonteVisualz emblem" className="h-8 w-8 object-cover" />
          <span className="display metal-text text-lg tracking-[0.14em] sm:text-xl">
            VonteVisualz
          </span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-xs text-[0.66rem] text-foreground/70 transition-colors hover:text-royal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#booking"
          className="ml-auto hidden border border-royal/60 bg-royal/15 px-5 py-2 text-[0.66rem] tracking-[0.22em] uppercase text-foreground transition-colors hover:bg-royal/35 lg:inline-block"
        >
          Book Now
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto p-2 text-foreground/80 xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border bg-ink px-4 py-4 xl:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="label-xs py-2 text-[0.7rem] text-foreground/80"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="mt-2 border border-royal/60 bg-royal/15 px-5 py-3 text-center text-[0.7rem] tracking-[0.22em] uppercase"
          >
            Book Now
          </a>
        </nav>
      )}
    </header>
  );
}
