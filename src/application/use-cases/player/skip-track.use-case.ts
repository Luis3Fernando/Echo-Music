import { RepeatMode } from "@value-objects/repeat-mode.object";

export class SkipTrackUseCase {
  execute(
    currentIndex: number,
    totalTracks: number,
    direction: 'next' | 'prev',
    repeatMode: RepeatMode
  ): number {
    if (totalTracks === 0) return 0;

    if (direction === 'next') {
      if (currentIndex >= totalTracks - 1) {
        return repeatMode === RepeatMode.ALL ? 0 : currentIndex;
      }
      return currentIndex + 1;
    } else {
      if (currentIndex <= 0) {
        return repeatMode === RepeatMode.ALL ? totalTracks - 1 : 0;
      }
      return currentIndex - 1;
    }
  }
}