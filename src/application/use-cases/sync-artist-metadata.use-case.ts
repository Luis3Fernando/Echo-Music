import { ExternalMusicService } from "@interfaces-services/external-music.service";
import { ArtistRepository } from "@interfaces/artist.repository";

export class SyncArtistMetadataUseCase {
  constructor(
    private externalService: ExternalMusicService,
    private artistRepo: ArtistRepository
  ) {}

  async execute(artistName: string) {
    const remoteArtists = await this.externalService.searchArtist(artistName);
    if (remoteArtists.length === 0) return;
    const bestMatch = remoteArtists[0];
    await this.artistRepo.save(bestMatch);
    
    return bestMatch;
  }
}