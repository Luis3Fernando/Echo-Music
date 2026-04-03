import { Track } from "@entities/track.entity";

export interface IPlayerService {
  setup(): Promise<void>;
  play(track: Track): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  seekTo(position: number): Promise<void>;
  stop(): Promise<void>;
  setQueue(tracks: Track[], startIndex: number): Promise<void>;
  skipToNext(): Promise<void>;
  skipToPrevious(): Promise<void>;
}