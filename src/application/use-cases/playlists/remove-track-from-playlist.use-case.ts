import { PlaylistRepository } from "@interfaces/playlist.repository";

export interface RemoveTrackDTO {
  playlistId: string;
  trackId: string;
}

export class RemoveTrackFromPlaylistUseCase {
  constructor(private playlistRepo: PlaylistRepository) {}

  async execute(data: RemoveTrackDTO): Promise<void> {
    const playlist = await this.playlistRepo.findById(data.playlistId);

    if (!playlist) {
      throw new Error("La playlist no existe.");
    }

    if (!playlist.isUserCreated) {
      throw new Error("No puedes modificar una playlist del sistema.");
    }

    await this.playlistRepo.removeTrackFromPlaylist(data.playlistId, data.trackId);
  }
}