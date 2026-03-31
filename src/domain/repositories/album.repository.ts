import { Album } from "@entities/album.entity";

export interface AlbumRepository {
  findById(id: string): Promise<Album | null>;
  findByNameAndArtist(title: string, artistId: string): Promise<Album | null>;
  save(album: Album): Promise<void>;
  findAll(): Promise<Album[]>;
  delete(id: string): Promise<void>;
  findByNameAndArtist(title: string, artistId: string): Promise<Album | null>;
  findByArtistId(artistId: string, artistName?: string): Promise<Album[]>;
  getRelatedAlbums(
    artistId: string,
    excludeAlbumId: string,
    limit?: number,
  ): Promise<Album[]>;
  search(query: string): Promise<Album[]>;
  getRecentAlbums(limit: number): Promise<Album[]>;
  getTopTrackCountAlbums(limit: number): Promise<Album[]>;
  getMostLikedAlbums(limit: number): Promise<Album[]>;
  getTotalAlbumsCount(): Promise<number>;
}
