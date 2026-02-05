import { RawTrack } from '@models/Track';

export interface ITrackRepository {
  findAll(): Promise<RawTrack[]>;
  scanDirectory(path: string): Promise<RawTrack[]>;
  save(track: RawTrack): Promise<void>;
  delete(id: string): Promise<void>;
}