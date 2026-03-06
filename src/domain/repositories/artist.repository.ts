import { Artist } from "@entities/artist.entity";

export interface ArtistRepository {
  save(artist: Artist): Promise<void>;

  findById(id: string): Promise<Artist | null>;

  findAll(): Promise<Artist[]>;
}