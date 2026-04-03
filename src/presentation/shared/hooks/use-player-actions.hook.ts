import { useRef } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { usePlayerStore } from "@store/use-player.store";
import { SqlitePlaybackQueueRepository } from "@repositories/sqlite-playback-queue.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SkipTrackUseCase } from "@use-cases/player/skip-track.use-case";
import { SetPlaybackQueueUseCase } from "@use-cases/player/set-playback-queue.use-case";
import { GetQueueArtworksUseCase } from "@use-cases/player/get-queue-artworks.use-case";
import { TrackPlayerService } from "@services/track-player.service";
import TrackPlayer, { State } from "react-native-track-player";

export const usePlayerActions = () => {
  const db = useSQLiteContext();
  const {
    queue,
    updateIndex,
    setCurrentTrack,
    setQueue,
    setQueueArtworks,
    setIsPlaying,
  } = usePlayerStore();
  const isProcessing = useRef(false);
  const playerService = new TrackPlayerService();

  const togglePlayPause = async () => {
    try {
      const state = await TrackPlayer.getPlaybackState();
      if (state.state === State.Playing) {
        await playerService.pause();
        setIsPlaying(false);
      } else {
        await playerService.resume();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadTrackMetadata = async (index: number, currentQueue = queue) => {
    if (!currentQueue) return;
    const trackRepo = new SqliteTrackRepository(db);
    const targetId = currentQueue.isShuffle
      ? currentQueue.shuffledTracks[index]
      : currentQueue.tracks[index];

    const trackData = await trackRepo.findById(targetId);
    if (trackData) setCurrentTrack(trackData);
  };

  const jumpToIndex = async (index: number) => {
    if (!queue || isProcessing.current) return;

    try {
      isProcessing.current = true;
      updateIndex(index);

      const queueRepo = new SqlitePlaybackQueueRepository(db);
      await queueRepo.updateCurrentIndex(index);
      await loadTrackMetadata(index);

      await TrackPlayer.skip(index);
      await playerService.resume();
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        isProcessing.current = false;
      }, 150);
    }
  };

  const handleSkip = async (direction: "next" | "prev") => {
    if (!queue || queue.tracks.length === 0 || isProcessing.current) return;

    const skipUseCase = new SkipTrackUseCase();
    const newIndex = skipUseCase.execute(
      queue.currentIndex,
      queue.tracks.length,
      direction,
      queue.repeatMode,
    );

    if (newIndex === queue.currentIndex && queue.repeatMode !== "all") return;

    await jumpToIndex(newIndex);
  };

  const playList = async (
    trackIds: string[],
    startIndex: number = 0,
    shuffle: boolean = false,
  ) => {
    if (isProcessing.current || trackIds.length === 0) return;

    isProcessing.current = true;

    try {
      const setQueueUseCase = new SetPlaybackQueueUseCase();
      const trackRepo = new SqliteTrackRepository(db);
      const queueRepo = new SqlitePlaybackQueueRepository(db);
      const artworksUseCase = new GetQueueArtworksUseCase(trackRepo);

      const newQueue = setQueueUseCase.execute({
        tracks: trackIds,
        startIndex,
        startWithShuffle: shuffle,
      });

      setQueue(newQueue);

      const actualTrackIds = newQueue.isShuffle
        ? newQueue.shuffledTracks
        : newQueue.tracks;
      const fullTracksData = await Promise.all(
        actualTrackIds.map((id) => trackRepo.findById(id)),
      );
      const validTracks = fullTracksData.filter(
        (t): t is NonNullable<typeof t> => t !== null,
      );

      const [artworksMap] = await Promise.all([
        artworksUseCase.execute(newQueue.tracks),
      ]);

      setQueueArtworks(artworksMap);
      if (validTracks[newQueue.currentIndex]) {
        setCurrentTrack(validTracks[newQueue.currentIndex]);
      }
      await queueRepo.save(newQueue);

      await playerService.setQueue(validTracks, newQueue.currentIndex);
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    } finally {
      isProcessing.current = false;
    }
  };

  const skipToNext = () => handleSkip("next");
  const skipToPrevious = () => handleSkip("prev");

  return { skipToNext, skipToPrevious, jumpToIndex, playList, togglePlayPause };
};