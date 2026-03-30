import { Track } from '@entities/track.entity';

export interface TrackRepository {
  saveAll(tracks: Track[]): Promise<void>;
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | null>;
  getPendingTracks(): Promise<Track[]>;
  updateMetadata(id: string, metadata: Partial<Track>): Promise<void>;
  deleteAll(): Promise<void>;
  getTracksByAlbumId(albumId: string): Promise<Track[]>;
  findByArtistId(artistId: string): Promise<Track[]>;
}