import { ArtistRepository } from "@interfaces/artist.repository";
import * as FileSystem from "expo-file-system/legacy";

const ARTIST_IMAGES_DIR = `${FileSystem.documentDirectory || FileSystem.cacheDirectory}custom_artists/`;

export class UpdateArtistImageUseCase {
  constructor(private artistRepo: ArtistRepository) {}

  async execute(artistId: string, imageUri: string): Promise<string> {
    const artist = await this.artistRepo.findById(artistId);

    if (!artist) {
      throw new Error("Artista no encontrado");
    }

    if (!imageUri) {
      artist.pictureUrl = "";
      await this.artistRepo.save(artist);
      return "";
    }

    const dirInfo = await FileSystem.getInfoAsync(ARTIST_IMAGES_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(ARTIST_IMAGES_DIR, {
        intermediates: true,
      });
    }

    const fileName = `artist_${artistId}_${Date.now()}.jpg`;
    const permanentUri = `${ARTIST_IMAGES_DIR}${fileName}`;

    await FileSystem.copyAsync({
      from: imageUri,
      to: permanentUri,
    });

    if (artist.pictureUrl && artist.pictureUrl.startsWith("file://")) {
      try {
        const oldFileInfo = await FileSystem.getInfoAsync(artist.pictureUrl);
        if (oldFileInfo.exists) {
          await FileSystem.deleteAsync(artist.pictureUrl, { idempotent: true });
        }
      } catch (e) {}
    }

    artist.pictureUrl = permanentUri;
    await this.artistRepo.save(artist);

    return permanentUri;
  }
}