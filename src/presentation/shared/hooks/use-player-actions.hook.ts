import { useSQLiteContext } from "expo-sqlite";
import { usePlayerStore } from "@store/use-player.store";
import { SqlitePlaybackQueueRepository } from "@repositories/sqlite-playback-queue.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SkipTrackUseCase } from "@use-cases/player/skip-track.use-case";

export const usePlayerActions = () => {
  const db = useSQLiteContext();
  const { queue, updateIndex, setCurrentTrack } = usePlayerStore();

  const loadTrackMetadata = async (index: number) => {
    if (!queue) return;
    
    const trackRepo = new SqliteTrackRepository(db);
    const targetId = queue.isShuffle 
      ? queue.shuffledTracks[index] 
      : queue.tracks[index];

    const trackData = await trackRepo.findById(targetId);
    setCurrentTrack(trackData);
  };

  const jumpToIndex = async (index: number) => {
    if (!queue || index === queue.currentIndex) return;

    updateIndex(index);
    const queueRepo = new SqlitePlaybackQueueRepository(db);
    queueRepo.updateCurrentIndex(index).catch(console.error);
    await loadTrackMetadata(index);
  };

  const handleSkip = async (direction: 'next' | 'prev') => {
    if (!queue || queue.tracks.length === 0) return;

    const skipUseCase = new SkipTrackUseCase();
    const newIndex = skipUseCase.execute(
      queue.currentIndex,
      queue.tracks.length,
      direction,
      queue.repeatMode
    );

    if (newIndex === queue.currentIndex && queue.repeatMode !== 'all') return;

    await jumpToIndex(newIndex);
  };

  const skipToNext = () => handleSkip('next');
  const skipToPrevious = () => handleSkip('prev');

  return { skipToNext, skipToPrevious, jumpToIndex };
};