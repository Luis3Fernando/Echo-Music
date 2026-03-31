import { TrackRepository } from "@interfaces/track.repository";
import { Track } from "@entities/track.entity";

export class GetLongestTracksUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute(limit: number = 50): Promise<Track[]> {
    return await this.trackRepo.getLongestTracks(limit);
  }
}