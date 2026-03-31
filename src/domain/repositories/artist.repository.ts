import { Artist } from "@entities/artist.entity";

export interface ArtistRepository {
  save(artist: Artist): Promise<void>;
  findById(id: string): Promise<Artist | null>;
  findByName(name: string): Promise<Artist | null>;
  findByIds(ids: string[]): Promise<Artist[]>;
  findAll(): Promise<Artist[]>;
  search(query: string): Promise<Artist[]>;
  getTopTrackCountArtists(limit: number): Promise<Artist[]>;
  getMostLikedArtists(limit: number): Promise<Artist[]>;
  getTopPlayedArtists(limit: number): Promise<Artist[]>;
  getTotalArtistsCount(): Promise<number>;
}