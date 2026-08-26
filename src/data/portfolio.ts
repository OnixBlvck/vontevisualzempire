import flyerBlackwork from "@/assets/flyer-blackwork-popup.jpg.asset.json";
import flyerMidnight from "@/assets/flyer-midnight-legacy.jpg.asset.json";
import videoNight from "@/assets/video-night-drive.jpg.asset.json";
import videoNeon from "@/assets/video-neon-lounge.jpg.asset.json";
import coverPain from "@/assets/cover-pain-made-me.jpg.asset.json";
import coverAfter from "@/assets/cover-after-midnight.jpg.asset.json";
import coverLoyalty from "@/assets/cover-loyalty.jpg.asset.json";
import coverTime from "@/assets/cover-time-heals-nothing.jpg.asset.json";
import logoVonte from "@/assets/logo-vontevisualz.jpg.asset.json";
import logoInknior from "@/assets/logo-inknior.jpg.asset.json";

export type Work = {
  id: string;
  title: string;
  category: "Flyer" | "Video" | "Cover Art" | "Logo";
  brand: string;
  src: string;
  ratio: string;
};

export const works: Work[] = [
  {
    id: "blackwork-popup",
    title: "The Blackwork Pop-Up",
    category: "Flyer",
    brand: "InkNior",
    src: flyerBlackwork.url,
    ratio: "754 / 528",
  },
  {
    id: "midnight-legacy",
    title: "Midnight Legacy",
    category: "Flyer",
    brand: "VonteVisuals",
    src: flyerMidnight.url,
    ratio: "754 / 528",
  },
  {
    id: "night-drive",
    title: "Night Drive",
    category: "Video",
    brand: "FastCutEdits",
    src: videoNight.url,
    ratio: "754 / 378",
  },
  {
    id: "neon-lounge",
    title: "Neon Lounge",
    category: "Video",
    brand: "FastCutEdits",
    src: videoNeon.url,
    ratio: "754 / 378",
  },
  {
    id: "pain-made-me",
    title: "Pain Made Me",
    category: "Cover Art",
    brand: "OnixBlvck",
    src: coverPain.url,
    ratio: "382 / 436",
  },
  {
    id: "after-midnight",
    title: "After Midnight",
    category: "Cover Art",
    brand: "OnixBlvck",
    src: coverAfter.url,
    ratio: "376 / 436",
  },
  {
    id: "loyalty",
    title: "Loyalty Over Everything",
    category: "Cover Art",
    brand: "OnixBlvck",
    src: coverLoyalty.url,
    ratio: "376 / 436",
  },
  {
    id: "time-heals-nothing",
    title: "Time Heals Nothing",
    category: "Cover Art",
    brand: "OnixBlvck",
    src: coverTime.url,
    ratio: "366 / 436",
  },
  {
    id: "logo-vontevisualz",
    title: "VonteVisuals Creative Empire",
    category: "Logo",
    brand: "VonteVisuals",
    src: logoVonte.url,
    ratio: "698 / 400",
  },
  {
    id: "logo-inknior",
    title: "InkNior Tattoo Artistry",
    category: "Logo",
    brand: "InkNior",
    src: logoInknior.url,
    ratio: "698 / 400",
  },
];
