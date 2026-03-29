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
    if (!playlist) throw new Error("La playlist no existe.");
    if (!playlist.isUserCreated) throw new Error("No puedes modificar esta lista.");

    const currentTracks = await this.playlistRepo.getTracksByPlaylistId(data.playlistId);
    const currentTrackIds = new Set(currentTracks.map(t => t.id));

    const duplicates = data.trackIds.filter(id => currentTrackIds.has(id));

    if (data.trackIds.length === 1 && duplicates.length === 1) {
      throw new Error("Esta canción ya está en la playlist");
    }

    if (duplicates.length === data.trackIds.length) {
      throw new Error("Estas canciones ya están en la playlist");
    }

    const newTrackIds = data.trackIds.filter(id => !currentTrackIds.has(id));

    await this.playlistRepo.addTracks(data.playlistId, newTrackIds);
  }
}