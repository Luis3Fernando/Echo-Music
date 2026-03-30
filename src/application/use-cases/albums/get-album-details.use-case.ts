import { AlbumRepository } from "@interfaces/album.repository";
import { TrackRepository } from "@interfaces/track.repository";
import { Album } from "@entities/album.entity";
import { Track } from "@entities/track.entity";

export interface AlbumDetails {
  album: Album;
  tracks: Track[];
}

export class GetAlbumDetailsUseCase {
  constructor(
    private albumRepo: AlbumRepository,
    private trackRepo: TrackRepository
  ) {}

  async execute(albumId: string): Promise<AlbumDetails> {
    let album = await this.albumRepo.findById(albumId);
    const tracks = await this.trackRepo.getTracksByAlbumId(albumId);

    if (!album && tracks.length > 0) {
      console.warn(`[GetAlbumDetails] Reconstruyendo álbum ${albumId} desde los tracks.`);
      
      const firstTrack = tracks[0];
      album = {
        id: albumId,
        title: firstTrack.albumName || "Álbum desconocido",
        artistId: firstTrack.artistId,
        artistName: firstTrack.artistName,
        artworkUri: firstTrack.artworkUri,
        trackCount: tracks.length,
        playCount: 0,
        year: firstTrack.year || 0,
        artistIds: [firstTrack.artistId] 
      };
    }

    if (!album) {
      throw new Error(`No se encontró el álbum ni canciones asociadas.`);
    }

    return { album, tracks };
  }
}