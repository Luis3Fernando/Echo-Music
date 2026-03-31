import { TrackRepository } from "@interfaces/track.repository";
import { ArtistRepository } from "@interfaces/artist.repository";
import { AlbumRepository } from "@interfaces/album.repository";
import { SearchResults } from "@dtos/search-results.dto";

export class SearchUseCase {
  constructor(
    private trackRepo: TrackRepository,
    private artistRepo: ArtistRepository,
    private albumRepo: AlbumRepository
  ) {}

  async execute(query: string): Promise<SearchResults> {
    const cleanQuery = query.trim();

    if (cleanQuery.length < 2) {
      return { tracks: [], artists: [], albums: [] };
    }

    const [tracks, artists, albums] = await Promise.all([
      this.trackRepo.search(cleanQuery),
      this.artistRepo.search(cleanQuery),
      this.albumRepo.search(cleanQuery)
    ]);

    return {
      tracks,
      artists,
      albums
    };
  }
}