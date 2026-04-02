import { PlaybackQueue } from "@entities/queue.entity";
import { RepeatMode } from "@value-objects/repeat-mode.object";

interface SetQueueParams {
  tracks: string[];
  startIndex?: number;
  startWithShuffle?: boolean;
}

export class SetPlaybackQueueUseCase {
  execute({
    tracks,
    startIndex = 0,
    startWithShuffle = false,
  }: SetQueueParams): PlaybackQueue {
    const totalTracks = tracks.length;
    if (totalTracks === 0) throw new Error("No hay canciones para reproducir");
    const originalTracks = [...tracks];
    let shuffledTracks: string[] = [];
    let finalIndex = startIndex;

    if (startWithShuffle) {
      shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
      finalIndex = 0;
    } else {
      const selectedId = tracks[startIndex];
      const remaining = tracks.filter((id) => id !== selectedId);
      shuffledTracks = [
        selectedId,
        ...remaining.sort(() => Math.random() - 0.5),
      ];
    }

    return {
      currentTrackId: startWithShuffle ? shuffledTracks[0] : tracks[startIndex],
      tracks: originalTracks,
      shuffledTracks: shuffledTracks,
      isShuffle: startWithShuffle,
      repeatMode: RepeatMode.NONE,
      currentIndex: finalIndex,
    };
  }
}
