import popMyShitAudio from "@/assets/pop-my-shit.m4a.asset.json";
import trackCover from "@/assets/pop-my-shit-cover.jpg.asset.json";

export type Track = {
  id: string;
  title: string;
  artist: string;
  project: string;
  cover: string;
  audioUrl: string;
};

export const tracks: Track[] = [
  {
    id: "pop-my-shit",
    title: "Pop My Shit",
    artist: "Onyx Blvck",
    project: "The Music Vault",
    cover: trackCover.url,
    audioUrl: popMyShitAudio.url,
  },
];

/** Legitimate external destination for the Onyx Blvck catalog. */
export const BANDLAB_URL =
  "https://www.bandlab.com/post/9ff03d4f-a978-44a5-b4a9-c2ed15d44156";
