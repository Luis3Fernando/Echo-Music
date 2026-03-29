import { Playlist } from "@entities/playlist.entity";
import { Track } from "@entities/track.entity";

export interface PlaylistRepository {
  save(playlist: Playlist): Promise<void>;
  findById(id: string): Promise<Playlist | null>;
  findByName(name: string): Promise<Playlist | null>;
  findAll(): Promise<Playlist[]>;
  delete(id: string): Promise<void>;
  addTracks(playlistId: string, trackIds: string[]): Promise<void>;
  getTracksByPlaylistId(playlistId: string): Promise<Track[]>;
  removeTrackFromPlaylist(playlistId: string, trackId: string): Promise<void>;
}