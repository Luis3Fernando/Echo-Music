import { PlaylistRepository } from "@interfaces/playlist.repository";
import { Playlist } from "@entities/playlist.entity";

export interface PlaylistsResult {
  systemPlaylists: Playlist[];
  userPlaylists: Playlist[];
}

export class GetAllPlaylistsUseCase {
  constructor(private playlistRepo: PlaylistRepository) {}

  async execute(): Promise<PlaylistsResult> {
    try {
      const allPlaylists = await this.playlistRepo.findAll();

      return {
        systemPlaylists: allPlaylists.filter(p => !p.isUserCreated),
        userPlaylists: allPlaylists.filter(p => p.isUserCreated),
      };
    } catch (error) {
      console.error("[GetAllPlaylistsUseCase] Error:", error);
      return { systemPlaylists: [], userPlaylists: [] };
    }
  }
}