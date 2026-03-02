import { Track } from '@/domain/entities/track.entity';

export interface TrackRepository {
  saveAll(tracks: Track[]): Promise<void>;
  getPendingTracks(): Promise<Track[]>;
  updateMetadata(id: string, metadata: Partial<Track>): Promise<void>;
  deleteAll(): Promise<void>;
}