import { TrackRepository } from "@interfaces/track.repository";

export class GetRecommendedTracksUseCase {
  constructor(private trackRepo: TrackRepository) {}

  async execute() {
    try {
      const allTracks = await this.trackRepo.findAll();
      const shuffled = [...allTracks]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      const formattedSongs = shuffled.map(track => ({
        id: track.id,
        type: 'song',
        data: {
          title: track.title,
          subtitle: track.artistName || "Artista desconocido",
          image: track.artworkUri ? { uri: track.artworkUri } : null,
        }
      }));

      const welcomeBanner = {
        id: 'welcome-ads-banner',
        type: 'ads',
        data: {
          title: "Bienvenido",
          subtitle: "Escucha y disfruta",
          image: null
        }
      };

      return [welcomeBanner, ...formattedSongs];
    } catch (error) {
      console.error("[UseCase] Error:", error);
      return [];
    }
  }
}