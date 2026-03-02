import * as FileSystem from "expo-file-system/legacy";
import * as mmb from "music-metadata-browser";
import { Buffer } from "buffer";

const ARTWORK_CACHE_DIR = `${FileSystem.cacheDirectory}artworks/`;

export const metadataExtractorService = {
  async extract(fileUri: string, trackId: string) {
    try {
      const isFlac = fileUri.toLowerCase().endsWith(".flac");
      const readSize = isFlac ? 1024 * 1024 * 2 : 1024 * 512;

      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
        position: 0,
        length: readSize,
      });

      const buffer = Buffer.from(base64, "base64");
      const metadata = await mmb.parseBuffer(buffer, {
        mimeType: isFlac ? "audio/flac" : "audio/mpeg",
      });

      const { common } = metadata;
      let artworkUri = null;

      if (common.picture && common.picture.length > 0) {
        artworkUri = await this.saveArtwork(trackId, common.picture[0]);
      }

      return {
        title: common.title,
        artist: common.artist || "Artista Desconocido",
        album: common.album || "Álbum Desconocido",
        genre: common.genre?.[0],
        year: common.year,
        trackNumber: common.track?.no,
        diskNumber: common.disk?.no,
        artworkUri,
      };
    } catch (error) {
      console.error(`[MetadataExtractor] Error en ${fileUri}:`, error);
      return null;
    }
  },

  async saveArtwork(trackId: string, picture: any): Promise<string | null> {
    try {
      const fileUri = `${ARTWORK_CACHE_DIR}thumb_${trackId}.jpg`;
      const dirInfo = await FileSystem.getInfoAsync(ARTWORK_CACHE_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(ARTWORK_CACHE_DIR, {
          intermediates: true,
        });
      }

      await FileSystem.writeAsStringAsync(
        fileUri,
        Buffer.from(picture.data).toString("base64"),
        {
          encoding: FileSystem.EncodingType.Base64,
        },
      );

      return fileUri;
    } catch (e) {
      return null;
    }
  },
};
