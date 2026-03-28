import { TrackRepository } from "@interfaces/track.repository";
import { PlaylistRepository } from "@interfaces/playlist.repository";
import { Playlist } from "@entities/playlist.entity";
import { Track } from "@entities/track.entity";

const SYSTEM_PLAYLISTS = {
  FAVORITES: "playlist-favorites",
  RECENT: "playlist-recent",
  POPULAR: "playlist-popular",
};

export class CreateInitialPlaylistsUseCase {
  constructor(
    private playlistRepo: PlaylistRepository,
    private trackRepo: TrackRepository
  ) {}

  async execute(): Promise<void> {
    try {
      const existing = await this.playlistRepo.findAll();
      if (existing.length > 0) return;

      console.log("[UseCase] Generando colecciones iniciales...");

      const allTracks = await this.trackRepo.findAll();
      await this.playlistRepo.save(this.createEmptyPlaylist(
        SYSTEM_PLAYLISTS.FAVORITES, 
        "Favoritos"
      ));

      const recentTracks = [...allTracks]
        .sort((a, b) => b.dateAdded - a.dateAdded)
        .slice(0, 100);
      
      await this.createSmartPlaylist(
        SYSTEM_PLAYLISTS.RECENT,
        "Recién agregadas",
        recentTracks
      );

      const popularTracks = [...allTracks]
        .sort((a, b) => b.playCount - a.playCount)
        .slice(0, 100);

      await this.createSmartPlaylist(
        SYSTEM_PLAYLISTS.POPULAR,
        "Lo más escuchado",
        popularTracks
      );

      console.log("[UseCase] Playlists iniciales creadas con éxito.");
    } catch (error) {
      console.error("[CreateInitialPlaylistsUseCase] Error crítico:", error);
    }
  }

  private createEmptyPlaylist(id: string, name: string): Playlist {
    const now = Date.now();
    return {
      id,
      name,
      artworkUri: null,
      isUserCreated: false,
      trackCount: 0,
      createdAt: now,
      updatedAt: now,
    };
  }

  private async createSmartPlaylist(id: string, name: string, tracks: Track[]): Promise<void> {
    const now = Date.now();
    const hasTracks = tracks.length > 0;

    const playlist: Playlist = {
      id,
      name,
      artworkUri: hasTracks ? tracks[0].artworkUri : null,
      isUserCreated: false,
      trackCount: tracks.length,
      createdAt: now,
      updatedAt: now,
    };

    await this.playlistRepo.save(playlist);

    if (hasTracks) {
      const trackIds = tracks.map(t => t.id);
      await this.playlistRepo.addTracks(id, trackIds);
    }
  }
}