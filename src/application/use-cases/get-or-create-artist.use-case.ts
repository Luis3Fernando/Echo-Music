import { ArtistRepository } from "@interfaces/artist.repository";
import { ExternalMusicService } from "@interfaces-services/external-music.service";
import { imageDownloaderService } from "@services/image-downloader.service";
import { Artist } from "@entities/artist.entity";
import * as Crypto from "expo-crypto";

export class GetOrCreateArtistUseCase {
  constructor(
    private artistRepo: ArtistRepository,
    private externalService: ExternalMusicService,
  ) {}

  async execute(artistName: string): Promise<Artist> {
    const cleanName = artistName.trim().toLowerCase();

    try {
      const localArtists = await this.artistRepo.findAll();
      const existing = localArtists.find(
        (a) => a.name.toLowerCase() === cleanName,
      );
      if (existing) return existing;

      try {
        const remoteResults =
          await this.externalService.searchArtist(cleanName);
        if (remoteResults.length > 0) {
          const exactMatch = remoteResults.find(
            (r) => r.name.toLowerCase() === cleanName,
          );
          let bestMatch = exactMatch || remoteResults[0];
          const localPath = await imageDownloaderService.downloadArtistImage(
            bestMatch.id,
            bestMatch.pictureUrl,
          );

          if (localPath) {
            bestMatch.pictureUrl = localPath;
          }
          await this.artistRepo.save(bestMatch);
          return bestMatch;
        }
      } catch (apiError) {
        console.warn(
          `[API] Fallo al buscar artista "${artistName}":`,
          apiError,
        );
      }

      const newArtist: Artist = {
        id: Crypto.randomUUID(),
        name: artistName.trim(),
        pictureUrl: "",
        description: null,
        socialLinks: null,
        reels: null,
        isProcessed: false,
      };

      await this.artistRepo.save(newArtist);
      return newArtist;
    } catch (dbError) {
      console.error("[DB] Error crítico recuperando/creando artista:", dbError);
      return {
        id: "temp-id",
        name: artistName,
        pictureUrl: "",
        isProcessed: false,
      };
    }
  }
}
