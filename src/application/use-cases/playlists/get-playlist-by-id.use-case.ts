import { PlaylistRepository } from "@interfaces/playlist.repository";
import { Playlist } from "@entities/playlist.entity";

export class GetPlaylistByIdUseCase {
  constructor(private playlistRepo: PlaylistRepository) {}

  async execute(id: string): Promise<Playlist | null> {
    try {
      if (!id) return null;
      
      const playlist = await this.playlistRepo.findById(id);
      
      if (!playlist) {
        console.warn(`[GetPlaylistByIdUseCase] Playlist con ID ${id} no encontrada.`);
        return null;
      }

      return playlist;
    } catch (error) {
      console.error(`[GetPlaylistByIdUseCase] Error crítico al recuperar playlist ${id}:`, error);
      return null;
    }
  }
}