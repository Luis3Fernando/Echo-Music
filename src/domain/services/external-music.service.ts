import { Artist } from "../entities/artist.entity";

export interface ExternalMusicService {
  searchArtist(name: string): Promise<Artist[]>;
}