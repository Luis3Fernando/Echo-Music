import { AlbumRepository } from "@interfaces/album.repository";
import { Album } from "@entities/album.entity";
import { Artist } from "@entities/artist.entity";
import { generateUUID } from "@utils/uuid";

export class AlbumManager {
  constructor(private albumRepo: AlbumRepository) {}

  async getOrCreate(
    title: string,
    artistName: string,
    artists: Artist[],
    metadata: { year?: number | null; artworkUri?: string | null }
  ): Promise<Album> {
    const cleanTitle = title.trim() || "Álbum Desconocido";
    
    const mainArtist = artists[0];
    const mainArtistId = mainArtist ? mainArtist.id : "unknown-artist-uuid";

    const existingAlbum = await this.albumRepo.findByNameAndArtist(cleanTitle, mainArtistId);
    
    if (existingAlbum) {
      return existingAlbum;
    }

    const newAlbum: Album = {
      id: generateUUID(),
      title: cleanTitle,
      artistId: mainArtistId,
      artistIds: artists.map(a => a.id),
      artistName: artistName,
      artworkUri: metadata.artworkUri || null,
      year: metadata.year || null,
      trackCount: 0,
      playCount: 0,
    };

    await this.albumRepo.save(newAlbum);
    
    return newAlbum;
  }
}