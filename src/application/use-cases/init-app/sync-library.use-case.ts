import { TrackRepository } from "@interfaces/track.repository";
import { ArtistRepository } from "@interfaces/artist.repository";
import { AlbumRepository } from "@interfaces/album.repository";
import { nativeMediaService } from "@services/native-media.service";
import { metadataExtractorService } from "@services/metadata-extractor.service";
import { TrackMapper } from "@mappers/track.mapper";
import { Lyrics } from "@value-objects/lyrics.object";
import { ArtistManager } from "@services/artist-manager.service";
import { AlbumManager } from "@services/album-manager.service";
import { ArtistSplitter } from "@utils/artist-splitter";

export class SyncLibraryUseCase {
  private artistManager: ArtistManager;
  private albumManager: AlbumManager;

  constructor(
    private trackRepo: TrackRepository,
    private artistRepo: ArtistRepository,
    private albumRepo: AlbumRepository,
  ) {
    this.artistManager = new ArtistManager(this.artistRepo);
    this.albumManager = new AlbumManager(this.albumRepo);
  }

  async execute(onProgress: (percent: number) => void): Promise<void> {
    try {
      const rawFiles = await nativeMediaService.fetchAllAudioFiles();
      if (rawFiles.length === 0) return;
      const unknownArtist = await this.artistManager.getOrCreate(
        "Artista Desconocido",
      );
      await this.artistManager.getOrCreate("Artista Desconocido");

      const initialTracks = rawFiles.map((file) =>
        TrackMapper.fromFile(file, {}, unknownArtist.id),
      );
      await this.trackRepo.saveAll(initialTracks);

      const pending = await this.trackRepo.getPendingTracks();
      let processedCount = 0;

      for (const track of pending) {
        const metadata = await metadataExtractorService.extract(
          track.url,
          track.id,
        );

        if (metadata) {
          const rawArtistName = metadata.artist || "Artista Desconocido";
          const artistNames = ArtistSplitter.split(rawArtistName);
          const artists = await this.artistManager.getOrCreateMany(artistNames);

          const mainArtist = artists[0];

          const albumTitle = metadata.album || "Álbum Desconocido";
          const album = await this.albumManager.getOrCreate(
            albumTitle,
            rawArtistName,
            artists,
            {
              year: metadata.year,
              artworkUri: metadata.artworkUri,
            },
          );

          await this.trackRepo.updateMetadata(track.id, {
            title: metadata.title || track.title,
            artistId: mainArtist.id,
            artistIds: artists.map((a) => a.id),
            artistName: rawArtistName,
            albumId: album.id,
            albumName: album.title,
            genre: metadata.genre ?? undefined,
            year: metadata.year ?? undefined,
            bitrate: metadata.bitrate ?? undefined,
            trackNumber: metadata.trackNumber ?? undefined,
            diskNumber: metadata.diskNumber ?? undefined,
            artworkUri: metadata.artworkUri ?? null,
            lyrics: metadata.lyrics ? (metadata.lyrics as Lyrics) : null,
            isProcessed: true,
          });
        } else {
          await this.trackRepo.updateMetadata(track.id, { isProcessed: true });
        }

        processedCount++;
        onProgress(Math.round((processedCount / pending.length) * 100));

        if (processedCount % 5 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
      }
    } catch (error) {
      console.error(
        "[SyncLibraryUseCase] Error fatal en la sincronización:",
        error,
      );
      throw error;
    }
  }
}
