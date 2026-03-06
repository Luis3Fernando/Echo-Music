import { Directory, File, Paths } from 'expo-file-system';

export const imageDownloaderService = {
  async downloadArtistImage(artistId: string, url: string): Promise<string | null> {
    if (!url) return null;

    try {
      const artistsDir = new Directory(Paths.document, 'artists');
      const destinationFile = new File(artistsDir, `${artistId}.jpg`);

      if (destinationFile.exists) {
        console.log(`[ImageDownloader] Usando caché local para: ${artistId}`);
        return destinationFile.uri;
      }

      if (!artistsDir.exists) {
        artistsDir.create({ intermediates: true, idempotent: true });
      }

      const tempDir = new Directory(Paths.cache, 'downloads');
      if (!tempDir.exists) tempDir.create({ idempotent: true });

      const downloadedFile = await File.downloadFileAsync(url, tempDir);
    
      if (destinationFile.exists) {
        destinationFile.delete();
      }

      downloadedFile.move(destinationFile);

      console.log(`[ImageDownloader] Nueva imagen descargada: ${artistId}`);
      return destinationFile.uri; 
    } catch (error) {
      console.error("[ImageDownloader] Error crítico en descarga:", error);
      return null;
    }
  }
};