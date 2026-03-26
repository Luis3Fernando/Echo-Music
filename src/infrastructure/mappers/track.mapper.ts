import { Track } from "@entities/track.entity";
import { generateUUID } from "@utils/uuid";

export const TrackMapper = {
  toDomain(row: any): Track {
    return {
      id: row.id,
      url: row.url,
      title: row.title,
      artistId: row.artistId,
      albumId: row.albumId || undefined,
      artistName: row.artistName,
      albumName: row.albumName,
      duration: row.duration,
      format: row.format,
      size: row.size,
      artworkUri: row.artworkUri || null,
      isFavorite: row.isFavorite === 1,
      isProcessed: row.isProcessed === 1,
      dateAdded: row.dateAdded,
      playCount: row.playCount || 0,
      lyrics: row.lyricsContent ? {
        content: row.lyricsContent,
        type: row.lyricsType as any,
        source: row.lyricsSource as any,
      } : null,
    };
  },

  toPersistence(track: Track) {
    return {
      id: track.id,
      url: track.url,
      title: track.title,
      artistId: track.artistId,
      albumId: track.albumId || null,
      artistName: track.artistName,
      albumName: track.albumName,
      duration: track.duration,
      format: track.format,
      size: track.size,
      artworkUri: track.artworkUri,
      isFavorite: track.isFavorite ? 1 : 0,
      isProcessed: track.isProcessed ? 1 : 0,
      dateAdded: track.dateAdded,
      playCount: track.playCount,
      lyricsContent: track.lyrics?.content || null,
      lyricsType: track.lyrics?.type || 'none',
      lyricsSource: track.lyrics?.source || null,
    };
  },


  fromFile(fileInfo: any, metadata: any, artistId: string, albumId?: string): Track {
    const cleanFileName = fileInfo.filename.replace(/\.[^/.]+$/, "");
    return {
      id: generateUUID(),
      url: fileInfo.uri,
      title: metadata.title || cleanFileName,
      artistId: artistId,
      albumId: albumId,
      artistName: metadata.artist || "Artista Desconocido",
      albumName: metadata.album || "Álbum Desconocido",
      duration: Math.round(fileInfo.duration * 1000),
      format: fileInfo.filename.split(".").pop()?.toLowerCase() || "unknown",
      size: fileInfo.size || 0,
      artworkUri: metadata.artworkUri || null,
      isFavorite: false,
      isProcessed: true,
      dateAdded: Date.now(),
      playCount: 0,
      lyrics: null,
    };
  },
};