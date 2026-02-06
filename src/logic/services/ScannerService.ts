import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system/legacy";
import * as mmb from "music-metadata-browser";
import { Buffer } from "buffer";
import { TrackRepository } from "@/domain/repository/TrackRepository";
import { useLibraryStore } from "@/logic/state/useLibraryStore";

const ARTWORK_CACHE_DIR = `${FileSystem.cacheDirectory}artworks/`;

class ScannerServiceClass {
  async startFullScan() {
    const { isScanning, setScanning, setProgress, setTotalTracks } =
      useLibraryStore.getState();
    if (isScanning) return;

    try {
      setScanning(true);
      setProgress(0);

      const dirInfo = await FileSystem.getInfoAsync(ARTWORK_CACHE_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(ARTWORK_CACHE_DIR, {
          intermediates: true,
        });
      }

      console.log("[Scanner] Limpiando base de datos para re-indexado...");
      await TrackRepository.deleteAll();

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 20,
      });

      setTotalTracks(media.assets.length);

      if (media.assets.length === 0) {
        setScanning(false);
        return;
      }

      const rawTracks = media.assets.map((asset) => ({
        id: asset.id,
        url: asset.uri,
        title: asset.filename,
        duration: asset.duration * 1000,
      }));

      await TrackRepository.saveRawPaths(rawTracks);
      await this.processPendingTracks();
    } catch (error) {
      console.error("[Scanner] ERROR:", error);
      setScanning(false);
    }
  }

  async processPendingTracks() {
    const { setProgress, setScanning } = useLibraryStore.getState();

    try {
      const pending = await TrackRepository.getPendingTracks();
      let processed = 0;

      for (const track of pending) {
        await new Promise((resolve) => setTimeout(resolve, 1));

        try {
          await new Promise((resolve) => setTimeout(resolve, 1));

          const isFlac = track.url.toLowerCase().endsWith(".flac");
          const readSize = isFlac ? 1024 * 1024 * 4 : 1024 * 512;

          const base64 = await FileSystem.readAsStringAsync(track.url, {
            encoding: "base64",
            position: 0,
            length: readSize,
          });

          const buffer = Buffer.from(base64, "base64");

          const metadata = await mmb.parseBuffer(buffer, {
            mimeType: isFlac ? "audio/flac" : "audio/mpeg",
          });
          const { common } = metadata;

          let finalArtworkUri = null;

          if (common.picture && common.picture.length > 0) {
            const pic = common.picture[0];
            const filename = `thumb_${track.id}.jpg`;
            const fileUri = `${ARTWORK_CACHE_DIR}${filename}`;

            await FileSystem.writeAsStringAsync(
              fileUri,
              Buffer.from(pic.data).toString("base64"),
              { encoding: "base64" },
            );

            finalArtworkUri = fileUri;
          }

          await TrackRepository.updateMetadata(track.id, {
            title: common.title || track.title,
            artist: common.artist || "Artista Desconocido",
            album: common.album || "Álbum Desconocido",
            year: common.year || null,
            artworkUri: finalArtworkUri,
            is_processed: 1,
          });
        } catch (error) {
          console.error(`Error procesando ${track.title}:`, error);
          await TrackRepository.updateMetadata(track.id, {
            is_processed: 1,
          } as any);
        }

        processed++;
        setProgress(Math.round((processed / pending.length) * 100));
      }
    } catch (error) {
      console.error("[Scanner] Error general", error);
    } finally {
      setScanning(false);
    }
  }
}

export const ScannerService = new ScannerServiceClass();
