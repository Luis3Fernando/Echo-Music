import { TrackRepository } from "@interfaces/track.repository";
import { Track } from "@entities/track.entity";

export class GetForgottenFavoritesUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute(): Promise<Track[]> {
    const totalFavorites = await this.trackRepo.getFavoriteTracksCount();
    
    if (totalFavorites === 0) return [];
    const limit = Math.ceil(totalFavorites / 4);

    return await this.trackRepo.getForgottenFavorites(limit);
  }
}