import { Track } from "@entities/track.entity";

export interface TrackRepository {
  saveAll(tracks: Track[]): Promise<void>;
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | null>;
  getPendingTracks(): Promise<Track[]>;
  updateMetadata(id: string, metadata: Partial<Track>): Promise<void>;
  deleteAll(): Promise<void>;
  getTracksByAlbumId(albumId: string): Promise<Track[]>;
  findByArtistId(artistId: string, artistName?: string): Promise<Track[]>;
  search(query: string): Promise<Track[]>;
  getLeastPlayedTracks(limit: number): Promise<Track[]>;
  getNeverPlayedTracks(limit: number): Promise<Track[]>;
  getLongestTracks(limit: number): Promise<Track[]>;
  getFavoriteTracksCount(): Promise<number>;
  getForgottenFavorites(limit: number): Promise<Track[]>;
  getMostPlayedTracks(limit: number): Promise<Track[]>;
}
