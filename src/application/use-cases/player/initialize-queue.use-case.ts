import { PlaybackQueueRepository } from "@interfaces/playback-queue.repository";
import { TrackRepository } from "@interfaces/track.repository";
import { PlaybackQueue } from "@entities/queue.entity";
import { RepeatMode } from "@value-objects/repeat-mode.object";

export class InitializeQueueUseCase {
  constructor(
    private queueRepo: PlaybackQueueRepository,
    private trackRepo: TrackRepository
  ) {}

  async execute(): Promise<PlaybackQueue> {
    const savedQueue = await this.queueRepo.get();

    if (savedQueue && savedQueue.tracks.length > 0) {
      return savedQueue;
    }

    const allTracks = await this.trackRepo.findAll();
    const allIds = allTracks.map(t => t.id);

    const defaultQueue: PlaybackQueue = {
      currentTrackId: allIds[0] || null,
      tracks: allIds,
      shuffledTracks: [...allIds].sort(() => Math.random() - 0.5),
      isShuffle: false,
      repeatMode: RepeatMode.NONE,
      currentIndex: 0,
    };

    await this.queueRepo.save(defaultQueue);
    return defaultQueue;
  }
}