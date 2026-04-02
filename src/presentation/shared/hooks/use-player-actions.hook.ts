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

  const playList = async (trackIds: string[], startIndex: number = 0, shuffle: boolean = false) => {
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
  };

  const skipToNext = () => handleSkip('next');
  const skipToPrevious = () => handleSkip('prev');

  return { skipToNext, skipToPrevious, jumpToIndex, playList };
};