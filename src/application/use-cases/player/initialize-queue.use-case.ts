import { PlaybackQueueRepository } from "@interfaces/playback-queue.repository";
import { TrackRepository } from "@interfaces/track.repository";
import { PlaybackQueue } from "@entities/queue.entity";
import { RepeatMode } from "@value-objects/repeat-mode.object";

export class InitializeQueueUseCase {
  constructor(
    private queueRepo: PlaybackQueueRepository,
    private trackRepo: TrackRepository
  ) {}

  async execute(): Promise<PlaybackQueue | null> {
    console.log("[InitializeQueueUseCase] Revisando cola existente...");
    const savedQueue = await this.queueRepo.get();

    if (savedQueue && savedQueue.tracks.length > 0) {
      console.log(`[InitializeQueueUseCase] Cola recuperada con ${savedQueue.tracks.length} canciones.`);
      return savedQueue;
    }

    console.log("[InitializeQueueUseCase] Cola vacía o inexistente. Buscando tracks en DB...");
    const allTracks = await this.trackRepo.findAll();
    
    if (allTracks.length === 0) {
      console.log("[InitializeQueueUseCase] No hay tracks en la DB todavía.");
      return null;
    }

    const allIds = allTracks.map(t => t.id);
    const defaultQueue: PlaybackQueue = {
      currentTrackId: allIds[0],
      tracks: allIds,
      shuffledTracks: [...allIds].sort(() => Math.random() - 0.5),
      isShuffle: false,
      repeatMode: RepeatMode.NONE,
      currentIndex: 0,
    };

    await this.queueRepo.save(defaultQueue);
    console.log(`[InitializeQueueUseCase] Nueva cola creada con ${allIds.length} canciones.`);
    return defaultQueue;
  }
}