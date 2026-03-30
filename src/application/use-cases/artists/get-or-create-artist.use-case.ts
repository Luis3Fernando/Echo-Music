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
    console.log(`\n[DEBUG-CREATE] 1. Buscando a: "${cleanName}"`);

    try {
      const existing = await this.artistRepo.findByName(cleanName);
      console.log(`[DEBUG-CREATE] 2. ¿Existe local?:`, existing ? `SI (ID: ${existing.id})` : "NO");

      if (existing && existing.pictureUrl && existing.isProcessed) {
        console.log(`[DEBUG-CREATE] 3. Retornando caché local.`);
        return existing;
      }

      try {
        const remoteResults = await this.externalService.searchArtist(cleanName);

        if (remoteResults.length > 0) {
          const bestMatch = remoteResults.find(
            (r) => r.name.toLowerCase() === cleanName.toLowerCase()
          ) || remoteResults[0];

          const localPath = await imageDownloaderService.downloadArtistImage(
            bestMatch.id.toString(),
            bestMatch.pictureUrl
          );

          const enrichedArtist: Artist = {
            ...bestMatch,
            id: existing ? existing.id : Crypto.randomUUID(),
            pictureUrl: localPath || bestMatch.pictureUrl,
            isProcessed: true,
          };

          console.log(`[DEBUG-CREATE] 4. Guardando enriquecido con ID: ${enrichedArtist.id}`);
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

      console.log(`[DEBUG-CREATE] 5. Creando NUEVO local con ID: ${newArtist.id}`);
      await this.artistRepo.save(newArtist);
      return newArtist;

    } catch (error) {
      console.error("[GetOrCreateArtist] Error:", error);
      return { id: "temp", name: artistName, pictureUrl: "", isProcessed: false };
    }
  }
}