import { PlaybackQueue } from "@entities/queue.entity";

export interface PlaybackQueueRepository {
  get(): Promise<PlaybackQueue | null>;
  save(queue: PlaybackQueue): Promise<void>;
  updateCurrentIndex(index: number): Promise<void>;
}