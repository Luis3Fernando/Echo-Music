import { PlaybackQueue } from "@entities/queue.entity";
import { RepeatMode } from "@value-objects/repeat-mode.object";

export class PlaybackQueueMapper {
  static toDomain(raw: any): PlaybackQueue {
    return {
      currentTrackId: raw.currentTrackId,
      tracks: raw.tracks ? JSON.parse(raw.tracks) : [],
      shuffledTracks: raw.shuffledTracks ? JSON.parse(raw.shuffledTracks) : [],
      isShuffle: Boolean(raw.isShuffle),
      repeatMode: (raw.repeatMode as RepeatMode) || RepeatMode.NONE,
      currentIndex: raw.currentIndex || 0,
    };
  }

  static toPersistence(queue: PlaybackQueue) {
    return {
      currentTrackId: queue.currentTrackId,
      tracks: JSON.stringify(queue.tracks),
      shuffledTracks: JSON.stringify(queue.shuffledTracks),
      isShuffle: queue.isShuffle ? 1 : 0,
      repeatMode: queue.repeatMode,
      currentIndex: queue.currentIndex,
    };
  }
}