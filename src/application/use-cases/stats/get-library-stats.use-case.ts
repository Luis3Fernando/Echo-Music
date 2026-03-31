import { TrackRepository } from "@interfaces/track.repository";
import { AlbumRepository } from "@interfaces/album.repository";
import { ArtistRepository } from "@interfaces/artist.repository";

export interface LibraryStats {
  totalTracks: number;
  totalAlbums: number;
  totalArtists: number;
  neverPlayedCount: number;
}

export class GetLibraryStatsUseCase {
  constructor(
    private trackRepo: TrackRepository,
    private albumRepo: AlbumRepository,
    private artistRepo: ArtistRepository,
  ) {}

  async execute(): Promise<LibraryStats> {
    const [totalTracks, totalAlbums, totalArtists, neverPlayedCount] =
      await Promise.all([
        this.trackRepo.getTotalTracksCount(),
        this.albumRepo.getTotalAlbumsCount(),
        this.artistRepo.getTotalArtistsCount(),
        this.trackRepo.getNeverPlayedCount(),
      ]);

    return {
      totalTracks,
      totalAlbums,
      totalArtists,
      neverPlayedCount,
    };
  }
}
