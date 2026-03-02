import { TrackRepository } from "@interfaces/track.repository";
import { nativeMediaService } from "@services/native-media.service";
import { metadataExtractorService } from "@services/metadata-extractor.service";
import { trackMapper } from "@mappers/track.mapper";

export class SyncLibraryUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute(onProgress: (percent: number) => void): Promise<void> {
    try {
      const rawFiles = await nativeMediaService.fetchAllAudioFiles();

      if (rawFiles.length === 0) return;
      const tracks = rawFiles.map((file) => trackMapper.toDomain(file));
      await this.trackRepo.saveAll(tracks);
      const pending = await this.trackRepo.getPendingTracks();
      let processedCount = 0;

      for (const track of pending) {
        const metadata = await metadataExtractorService.extract(
          track.url,
          track.id,
        );

        if (metadata) {
          await this.trackRepo.updateMetadata(track.id, {
            title: metadata.title || track.title,
            artistName: metadata.artist,
            albumName: metadata.album, 
            genre: metadata.genre,
            year: metadata.year,
            trackNumber: metadata.trackNumber,
            diskNumber: metadata.diskNumber,
            artworkUri: metadata.artworkUri,
            isProcessed: true,
          });
        } else {
          await this.trackRepo.updateMetadata(track.id, { isProcessed: true });
        }
        processedCount++;
        onProgress(Math.round((processedCount / pending.length) * 100));
        if (processedCount % 5 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
    } catch (error) {
      console.error("[SyncLibraryUseCase] Error fatal:", error);
      throw error;
    }
  }
}
