import { PlaylistRepository } from "@interfaces/playlist.repository";

export interface AddTracksDTO {
  playlistId: string;
  trackIds: string[];
}

export class AddTracksToPlaylistUseCase {
  constructor(private playlistRepo: PlaylistRepository) {}

  async execute(data: AddTracksDTO): Promise<void> {
    if (data.trackIds.length === 0) return;

    const playlist = await this.playlistRepo.findById(data.playlistId);

    if (!playlist) {
      throw new Error("La playlist no existe.");
    }

    if (!playlist.isUserCreated) {
      throw new Error("No puedes añadir canciones a una playlist del sistema.");
    }

    await this.playlistRepo.addTracks(data.playlistId, data.trackIds);
  }
}