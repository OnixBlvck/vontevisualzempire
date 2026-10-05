import { Download } from "lucide-react";
import vcardQr from "@/assets/empire-access-qr.png.asset.json";
import emblem from "@/assets/vonte-emblem.jpg.asset.json";

interface DigitalCardProps {
  className?: string;
}

export function DigitalCard({ className = "" }: DigitalCardProps) {
  return (
    <div className={`panel p-6 text-center ${className}`}>
      <img
        src={emblem.url}
        alt="VonteVisualz emblem"
        className="mx-auto h-16 w-auto object-contain"
      />
      <p className="metal-text mt-3 text-xl">VonteVisualz</p>
      <p className="mt-2 text-[0.65rem] tracking-[0.16em] uppercase text-silver">
        Da'zson Bolding
      </p>
      <p className="text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">
        Houston, Texas
      </p>
      <a href="tel:+18325997747" className="mt-2 block text-[0.62rem] text-muted-foreground hover:text-foreground">(832) 599-7747</a>
      <a href="mailto:vontevisualz@gmail.com" className="block text-[0.62rem] text-muted-foreground hover:text-foreground">vontevisualz@gmail.com</a>
      <a href="https://vontevisualz.com" className="block text-[0.62rem] text-muted-foreground hover:text-foreground">vontevisualz.com</a>
      <img
        src={vcardQr.url}
        alt="QR code linking to vontevisualz.com"
        loading="lazy"
        className="mx-auto mt-5 size-32 bg-white p-2"
      />
      <p className="label-xs mt-3 text-[0.55rem] text-gold">Scan To Connect</p>
      <a
        href="/vontevisualz.vcf"
        download="vontevisualz.vcf"
        className="mt-4 inline-flex min-h-11 items-center gap-2 border border-royal/50 bg-royal/15 px-5 text-[0.6rem] tracking-[0.2em] uppercase transition-colors hover:bg-royal/35"
      >
        <Download className="size-3.5" /> Save Contact
      </a>
    </div>
  );
}
