import { Directory, File, Paths } from "expo-file-system";

export const imageDownloaderService = {
  async downloadArtistImage(
    artistId: string,
    url: string,
  ): Promise<string | null> {
    if (!url) return null;

    try {
      const artistsDir = new Directory(Paths.document, "artists");
      const destinationFile = new File(artistsDir, `${artistId}.jpg`);

      if (destinationFile.exists) return destinationFile.uri;

      if (!artistsDir.exists) {
        artistsDir.create({ intermediates: true, idempotent: true });
      }

      const tempDir = new Directory(Paths.cache, "downloads");
      if (!tempDir.exists) tempDir.create({ idempotent: true });
      const downloadedFile = await File.downloadFileAsync(url, tempDir);

      if (!downloadedFile || !downloadedFile.exists) {
        return null;
      }

      if (destinationFile.exists) destinationFile.delete();

      downloadedFile.move(destinationFile);
      return destinationFile.uri;
    } catch (error) {
      console.log(
        `[ImageDownloader] Sin internet o error de red para el ID: ${artistId}`,
      );
      return null;
    }
  },
};
