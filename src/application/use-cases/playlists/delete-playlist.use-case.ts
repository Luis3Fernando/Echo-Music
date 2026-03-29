import { PlaylistRepository } from "@interfaces/playlist.repository";

export class DeletePlaylistUseCase {
  constructor(private playlistRepo: PlaylistRepository) {}

  async execute(id: string): Promise<void> {
    const playlist = await this.playlistRepo.findById(id);
    
    if (!playlist) {
      throw new Error("La playlist no existe.");
    }

    if (!playlist.isUserCreated) {
      throw new Error("No se pueden eliminar playlists del sistema.");
    }

    await this.playlistRepo.delete(id);
  }
}