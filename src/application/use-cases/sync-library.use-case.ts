import { TrackRepository } from "@interfaces/track.repository";
import { ArtistRepository } from "@interfaces/artist.repository";
import { AlbumRepository } from "@interfaces/album.repository";
import { nativeMediaService } from "@services/native-media.service";
import { metadataExtractorService } from "@services/metadata-extractor.service";
import { TrackMapper } from "@mappers/track.mapper";
import { generateUUID } from "@utils/uuid";
import { Lyrics } from "@value-objects/lyrics.object";

export class SyncLibraryUseCase {
  constructor(
    private trackRepo: TrackRepository,
    private artistRepo: ArtistRepository,
    private albumRepo: AlbumRepository,
  ) {}

  async execute(onProgress: (percent: number) => void): Promise<void> {
    try {
      const rawFiles = await nativeMediaService.fetchAllAudioFiles();
      if (rawFiles.length === 0) return;

      const UNKNOWN_ARTIST_ID = "unknown-artist-uuid";
      let unknownArtist = await this.artistRepo.findById(UNKNOWN_ARTIST_ID);

      if (!unknownArtist) {
        await this.artistRepo.save({
          id: UNKNOWN_ARTIST_ID,
          name: "Artista Desconocido",
          pictureUrl: "",
          isProcessed: false,
        });
      }

      const initialTracks = rawFiles.map((file) =>
        TrackMapper.fromFile(file, {}, UNKNOWN_ARTIST_ID),
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
          const artistName = metadata.artist || "Artista Desconocido";
          const albumTitle = metadata.album || "Álbum Desconocido";

          let artist = await this.artistRepo.findByName(artistName);
          if (!artist) {
            artist = {
              id: generateUUID(),
              name: artistName,
              pictureUrl: "",
              isProcessed: false,
            };
            await this.artistRepo.save(artist);
          }

          let album = await this.albumRepo.findByNameAndArtist(
            albumTitle,
            artist.id,
          );
          if (!album) {
            album = {
              id: generateUUID(),
              title: albumTitle,
              artistId: artist.id,
              artistName: artist.name,
              artworkUri: metadata.artworkUri || null,
              year: metadata.year ?? null,
              trackCount: 1,
              playCount: 0,
            };
            await this.albumRepo.save(album);
          }

          await this.trackRepo.updateMetadata(track.id, {
            title: metadata.title || track.title,
            artistId: artist.id,
            albumId: album.id,
            artistName: artist.name,
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
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
    } catch (error) {
      console.error("[SyncLibraryUseCase] Error fatal:", error);
      throw error;
    }
  }
}
