import { ArtistRepository } from "@interfaces/artist.repository";
import { Artist } from "@entities/artist.entity";

export class GetTopTrackCountArtistsUseCase {
  constructor(private artistRepo: ArtistRepository) {}

  async execute(limit: number = 10): Promise<Artist[]> {
    return await this.artistRepo.getTopTrackCountArtists(limit);
  }
}