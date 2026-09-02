import popMyShitAudio from "@/assets/pop-my-shit.m4a.asset.json";
import playerRose from "@/assets/player-rose.jpg.asset.json";

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
    artist: "OnixBlvck",
    project: "The Music Vault",
    cover: playerRose.url,
    audioUrl: popMyShitAudio.url,
  },
];

/** Legitimate external destination for the OnixBlvck catalog. */
export const BANDLAB_URL =
  "https://www.bandlab.com/post/9ff03d4f-a978-44a5-b4a9-c2ed15d44156";
