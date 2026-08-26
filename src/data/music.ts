import coverPain from "@/assets/cover-pain-made-me.jpg.asset.json";
import coverAfter from "@/assets/cover-after-midnight.jpg.asset.json";
import coverLoyalty from "@/assets/cover-loyalty.jpg.asset.json";
import coverTime from "@/assets/cover-time-heals-nothing.jpg.asset.json";

/**
 * Track shape is intentionally close to a future backend row so the music
 * system can move off this file (upload cover + audio, publish) without
 * touching the homepage components.
 */
export type Track = {
  id: string;
  title: string;
  artist: string;
  project: string;
  cover: string;
  /** Direct audio file, once uploaded. Null = playback lives on the external link. */
  audioUrl: string | null;
  /** Legitimate destination for listening. */
  externalUrl: string;
};

export const BANDLAB_URL =
  "https://www.bandlab.com/post/9ff03d4f-a978-44a5-b4a9-c2ed15d44156";

export const tracks: Track[] = [
  {
    id: "pain-made-me",
    title: "Pain Made Me",
    artist: "OnixBlvck",
    project: "The Music Vault",
    cover: coverPain.url,
    audioUrl: null,
    externalUrl: BANDLAB_URL,
  },
  {
    id: "after-midnight",
    title: "After Midnight",
    artist: "OnixBlvck",
    project: "The Music Vault",
    cover: coverAfter.url,
    audioUrl: null,
    externalUrl: BANDLAB_URL,
  },
  {
    id: "loyalty",
    title: "Loyalty",
    artist: "OnixBlvck",
    project: "The Music Vault",
    cover: coverLoyalty.url,
    audioUrl: null,
    externalUrl: BANDLAB_URL,
  },
  {
    id: "time-heals-nothing",
    title: "Time Heals Nothing",
    artist: "OnixBlvck",
    project: "The Music Vault",
    cover: coverTime.url,
    audioUrl: null,
    externalUrl: BANDLAB_URL,
  },
];
