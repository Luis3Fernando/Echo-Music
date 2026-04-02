import { useRef } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { usePlayerStore } from "@store/use-player.store";
import { SqlitePlaybackQueueRepository } from "@repositories/sqlite-playback-queue.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SkipTrackUseCase } from "@use-cases/player/skip-track.use-case";
import { SetPlaybackQueueUseCase } from "@use-cases/player/set-playback-queue.use-case";
import { GetQueueArtworksUseCase } from "@use-cases/player/get-queue-artworks.use-case";

export const usePlayerActions = () => {
  const db = useSQLiteContext();
  const {
    queue,
    updateIndex,
    setCurrentTrack,
    setQueue,
    setQueueArtworks
  } = usePlayerStore();
  const isProcessing = useRef(false);

  const loadTrackMetadata = async (index: number, currentQueue = queue) => {
    if (!currentQueue) return;
    const trackRepo = new SqliteTrackRepository(db);
    const targetId = currentQueue.isShuffle
      ? currentQueue.shuffledTracks[index]
      : currentQueue.tracks[index];

    const trackData = await trackRepo.findById(targetId);
    setCurrentTrack(trackData);
  };

  const jumpToIndex = async (index: number) => {
    if (!queue || isProcessing.current) return;

    try {
      isProcessing.current = true;
      updateIndex(index);

      const queueRepo = new SqlitePlaybackQueueRepository(db);
      await queueRepo.updateCurrentIndex(index);
      await loadTrackMetadata(index);
    } catch (error) {
    } finally {
      setTimeout(() => {
        isProcessing.current = false;
      }, 150);
    }
  };

  const handleSkip = async (direction: 'next' | 'prev') => {
    if (!queue || queue.tracks.length === 0 || isProcessing.current) return;

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

  const playList = async (trackIds: string[], startIndex: number = 0, shuffle: boolean = false) => {
    if (isProcessing.current) return;

    isProcessing.current = true;

    try {
      const setQueueUseCase = new SetPlaybackQueueUseCase();
      const trackRepo = new SqliteTrackRepository(db);
      const queueRepo = new SqlitePlaybackQueueRepository(db);
      const artworksUseCase = new GetQueueArtworksUseCase(trackRepo);

      const newQueue = setQueueUseCase.execute({
        tracks: trackIds,
        startIndex,
        startWithShuffle: shuffle
      });

      setQueue(newQueue);

      const [trackData, artworksMap] = await Promise.all([
        trackRepo.findById(newQueue.currentTrackId!),
        artworksUseCase.execute(newQueue.tracks)
      ]);

      setCurrentTrack(trackData);
      setQueueArtworks(artworksMap);
      await queueRepo.save(newQueue);
    } catch (error) {
    } finally {
      isProcessing.current = false;
    }
  };

  const skipToNext = () => handleSkip('next');
  const skipToPrevious = () => handleSkip('prev');

  return { skipToNext, skipToPrevious, jumpToIndex, playList };
};