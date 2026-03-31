import { TrackRepository } from "@interfaces/track.repository";
import { Track } from "@entities/track.entity";

export class GetMostPlayedTracksUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute(limit: number = 8): Promise<Track[]> {
    return await this.trackRepo.getMostPlayedTracks(limit);
  }
}