import { PlaylistRepository } from "@interfaces/playlist.repository";
import { Playlist } from "@entities/playlist.entity";
import * as FileSystem from "expo-file-system/legacy";

const PLAYLIST_IMAGES_DIR = `${FileSystem.documentDirectory || FileSystem.cacheDirectory}custom_playlists/`;

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

    let finalArtworkUri = existingPlaylist.artworkUri;

    if (data.artworkUri === "" || data.artworkUri === null) {
      finalArtworkUri = null;
    } else if (data.artworkUri && data.artworkUri !== existingPlaylist.artworkUri) {
      const dirInfo = await FileSystem.getInfoAsync(PLAYLIST_IMAGES_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(PLAYLIST_IMAGES_DIR, {
          intermediates: true,
        });
      }

      const fileName = `playlist_${existingPlaylist.id}_${Date.now()}.jpg`;
      const permanentUri = `${PLAYLIST_IMAGES_DIR}${fileName}`;

      await FileSystem.copyAsync({
        from: data.artworkUri,
        to: permanentUri,
      });

      finalArtworkUri = permanentUri;
    }

    if (
      data.artworkUri !== undefined &&
      existingPlaylist.artworkUri !== finalArtworkUri &&
      existingPlaylist.artworkUri?.startsWith("file://")
    ) {
      try {
        const oldFileInfo = await FileSystem.getInfoAsync(existingPlaylist.artworkUri);
        if (oldFileInfo.exists) {
          await FileSystem.deleteAsync(existingPlaylist.artworkUri, { idempotent: true });
        }
      } catch (e) {}
    }

    const updatedPlaylist: Playlist = {
      ...existingPlaylist,
      name: trimmedName,
      artworkUri: finalArtworkUri,
      updatedAt: Date.now(),
    };

    await this.playlistRepo.save(updatedPlaylist);
  }
}