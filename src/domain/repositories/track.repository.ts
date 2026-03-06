import { Track } from '@entities/track.entity';

export interface TrackRepository {
  saveAll(tracks: Track[]): Promise<void>;
  findAll(): Promise<Track[]>;
  getPendingTracks(): Promise<Track[]>;
  updateMetadata(id: string, metadata: Partial<Track>): Promise<void>;
  deleteAll(): Promise<void>;
}