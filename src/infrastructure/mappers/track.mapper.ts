import { Track } from "@entities/track.entity";

export const trackMapper = {
  toDomain(raw: any, metadata?: any): Track {
    const cleanFileName = raw.filename.replace(/\.[^/.]+$/, ""); 

    return {
      id: raw.id,
      url: raw.uri,
      title: metadata?.title || cleanFileName,
      artistName: metadata?.artist || 'Artista Desconocido',
      albumName: metadata?.album || 'Álbum Desconocido',
      duration: raw.duration * 1000,
      format: raw.filename.split('.').pop()?.toLowerCase() || 'unknown',
      size: 0,
      artworkUri: metadata?.artworkUri || null,
      isProcessed: !!metadata, 
      dateAdded: Date.now(),
    };
  }
};