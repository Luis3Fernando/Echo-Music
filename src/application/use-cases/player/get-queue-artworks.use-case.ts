import { TrackRepository } from "@interfaces/track.repository";

export class GetQueueArtworksUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute(ids: string[]): Promise<Record<string, string | null>> {
    if (ids.length === 0) return {};

    const results = await this.trackRepo.findArtworksByIds(ids);
    
    const map: Record<string, string | null> = {};
    results.forEach(item => {
      map[item.id] = item.artworkUri;
    });
    
    return map;
  }
}