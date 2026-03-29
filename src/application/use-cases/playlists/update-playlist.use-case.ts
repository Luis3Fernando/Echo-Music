import { PlaylistRepository } from "@interfaces/playlist.repository";
import { Playlist } from "@entities/playlist.entity";

export interface UpdatePlaylistDTO {
  id: string;
  name: string;
  artworkUri?: string | null;
}

export class UpdatePlaylistUseCase {
  constructor(private playlistRepo: PlaylistRepository) {}

  async execute(data: UpdatePlaylistDTO): Promise<void> {
    const existingPlaylist = await this.playlistRepo.findById(data.id);
    if (!existingPlaylist) {
      throw new Error("La playlist no existe.");
    }

    if (!existingPlaylist.isUserCreated) {
      throw new Error("No puedes editar una playlist del sistema.");
    }

    const trimmedName = data.name.trim();
    if (!trimmedName) {
      throw new Error("El nombre no puede estar vacío.");
    }

    if (trimmedName !== existingPlaylist.name) {
      const duplicate = await this.playlistRepo.findByName(trimmedName);
      if (duplicate) {
        throw new Error(`Ya tienes otra playlist llamada "${trimmedName}".`);
      }
    }

    const updatedPlaylist: Playlist = {
      ...existingPlaylist,
      name: trimmedName,
      artworkUri:
        data.artworkUri !== undefined
          ? data.artworkUri
          : existingPlaylist.artworkUri,
      updatedAt: Date.now(),
    };

    await this.playlistRepo.save(updatedPlaylist);
  }
}
