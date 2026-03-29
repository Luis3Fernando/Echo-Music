import { PlaylistRepository } from "@interfaces/playlist.repository";
import { Playlist } from "@entities/playlist.entity";
import { generateUUID } from "@utils/uuid";

export interface CreatePlaylistDTO {
  name: string;
  artworkUri?: string | null;
}

export class CreatePlaylistUseCase {
  constructor(private playlistRepo: PlaylistRepository) {}

  async execute(data: CreatePlaylistDTO): Promise<Playlist> {
    const trimmedName = data.name.trim();

    if (!trimmedName) {
      throw new Error("El nombre de la playlist es obligatorio.");
    }

    const existing = await this.playlistRepo.findByName(trimmedName);
    if (existing) {
      throw new Error(`Ya tienes una playlist llamada "${trimmedName}".`);
    }

    const now = Date.now();
    const newPlaylist: Playlist = {
      id: generateUUID(),
      name: trimmedName,
      artworkUri: data.artworkUri || null,
      isUserCreated: true,
      trackCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    await this.playlistRepo.save(newPlaylist);
    return newPlaylist;
  }
}