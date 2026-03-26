import { RepeatMode } from "../value-objects/repeat-mode.object";

export interface PlaybackQueue {
  currentTrackId: string | null;
  tracks: string[]; 
  shuffledTracks: string[];
  isShuffle: boolean;
  repeatMode: RepeatMode;
  currentIndex: number;
}