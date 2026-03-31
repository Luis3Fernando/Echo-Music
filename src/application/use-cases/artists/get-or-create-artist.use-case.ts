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
    const cleanName = artistName.trim();

    try {
      const existing = await this.artistRepo.findByName(cleanName);

      if (existing && existing.pictureUrl && existing.isProcessed) {
        return existing;
      }

      try {
        const remoteResults =
          await this.externalService.searchArtist(cleanName);

        if (remoteResults.length > 0) {
          const bestMatch =
            remoteResults.find(
              (r) => r.name.toLowerCase() === cleanName.toLowerCase(),
            ) || remoteResults[0];

          const localPath = await imageDownloaderService.downloadArtistImage(
            bestMatch.id.toString(),
            bestMatch.pictureUrl,
          );

          const enrichedArtist: Artist = {
            ...bestMatch,
            id: existing ? existing.id : Crypto.randomUUID(),
            pictureUrl: localPath || bestMatch.pictureUrl,
            isProcessed: true,
          };

          await this.artistRepo.save(enrichedArtist);
          return enrichedArtist;
        }
      } catch (apiError) {
        console.warn(`[API] Error: ${artistName}`);
      }

      if (existing) return existing;

      const newArtist: Artist = {
        id: Crypto.randomUUID(),
        name: cleanName,
        pictureUrl: "",
        description: null,
        socialLinks: null,
        reels: null,
        isProcessed: false,
      };

      await this.artistRepo.save(newArtist);
      return newArtist;
    } catch (error) {
      return {
        id: "temp",
        name: artistName,
        pictureUrl: "",
        isProcessed: false,
      };
    }
  }
}
