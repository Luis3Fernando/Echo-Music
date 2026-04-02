import { useSQLiteContext } from "expo-sqlite";
import { usePlayerStore } from "@store/use-player.store";
import { SqlitePlaybackQueueRepository } from "@repositories/sqlite-playback-queue.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";

export const usePlayerActions = () => {
  const db = useSQLiteContext();
  const { queue, updateIndex, setCurrentTrack } = usePlayerStore();

  const skipToNext = async () => {
    if (!queue) return;

    let nextIndex = queue.currentIndex + 1;

    if (nextIndex >= queue.tracks.length) {
      nextIndex = 0;
    }

    updateIndex(nextIndex);

    const queueRepo = new SqlitePlaybackQueueRepository(db);
    await queueRepo.updateCurrentIndex(nextIndex);

    const trackRepo = new SqliteTrackRepository(db);
    const nextId = queue.isShuffle
      ? queue.shuffledTracks[nextIndex]
      : queue.tracks[nextIndex];
    const trackData = await trackRepo.findById(nextId);

    setCurrentTrack(trackData);
  };

  return { skipToNext };
};
