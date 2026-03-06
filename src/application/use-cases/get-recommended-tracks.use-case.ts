import { TrackRepository } from "@interfaces/track.repository";

export class GetRecommendedTracksUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute() {
    try {
      const allTracks = await this.trackRepo.findAll();
      
      if (!allTracks || allTracks.length === 0) return [];

      return [...allTracks]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map(track => ({
          id: track.id,
          type: 'song',
          data: {
            title: track.title,
            subtitle: track.artistName,
            image: track.artworkUri ? { uri: track.artworkUri } : null,
          }
        }));
    } catch (error) {
      console.warn("[UseCase] La tabla 'tracks' aún no está lista o no existe.");
      return [];
    }
  }
}