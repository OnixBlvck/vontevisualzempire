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
