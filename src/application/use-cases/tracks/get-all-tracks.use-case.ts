import { TrackRepository } from "@interfaces/track.repository";
import { Track } from "@entities/track.entity";

export class GetAllTracksUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute(sortOrder: string): Promise<Track[]> {
    return await this.trackRepo.findAll(sortOrder);
  }
}