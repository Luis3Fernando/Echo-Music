import { SQLiteDatabase } from "expo-sqlite";
import { PlaylistRepository } from "@interfaces/playlist.repository";
import { Playlist } from "@entities/playlist.entity";
import { Track } from "@entities/track.entity";
import { PlaylistMapper } from "@mappers/playlist.mapper";
import { TrackMapper } from "@mappers/track.mapper";

export class SqlitePlaylistRepository implements PlaylistRepository {
  constructor(private db: SQLiteDatabase) {}

  async save(playlist: Playlist): Promise<void> {
    const p = PlaylistMapper.toPersistence(playlist);
    await this.db.runAsync(
      `INSERT OR REPLACE INTO playlists 
      (id, name, artworkUri, isUserCreated, trackCount, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id,
        p.name,
        p.artworkUri,
        p.isUserCreated,
        p.trackCount,
        p.createdAt,
        p.updatedAt,
      ],
    );
  }

  async addTracks(playlistId: string, trackIds: string[]): Promise<void> {
    await this.db.withTransactionAsync(async () => {
      const lastIndexRow = await this.db.getFirstAsync<{ maxIdx: number }>(
        "SELECT MAX(orderIndex) as maxIdx FROM playlist_tracks WHERE playlistId = ?",
        [playlistId],
      );
      let currentIndex = (lastIndexRow?.maxIdx ?? -1) + 1;
      for (const trackId of trackIds) {
        await this.db.runAsync(
          "INSERT OR IGNORE INTO playlist_tracks (playlistId, trackId, orderIndex) VALUES (?, ?, ?)",
          [playlistId, trackId, currentIndex++],
        );
      }

      await this.db.runAsync(
        `UPDATE playlists SET trackCount = (
          SELECT COUNT(*) FROM playlist_tracks WHERE playlistId = ?
        ), updatedAt = ? WHERE id = ?`,
        [playlistId, Date.now(), playlistId],
      );
    });
  }

  async findAll(): Promise<Playlist[]> {
    const rows = await this.db.getAllAsync<any>(
      "SELECT * FROM playlists ORDER BY createdAt DESC",
    );
    return rows.map(PlaylistMapper.toDomain);
  }

  async findById(id: string): Promise<Playlist | null> {
    const row = await this.db.getFirstAsync<any>(
      "SELECT * FROM playlists WHERE id = ?",
      [id],
    );
    return row ? PlaylistMapper.toDomain(row) : null;
  }

  async findByName(name: string): Promise<Playlist | null> {
    const row = await this.db.getFirstAsync<any>(
      "SELECT * FROM playlists WHERE name = ?",
      [name],
    );
    return row ? PlaylistMapper.toDomain(row) : null;
  }

  async getTracksByPlaylistId(playlistId: string): Promise<Track[]> {
    const rows = await this.db.getAllAsync<any>(
      `
      SELECT t.*, 
      (SELECT json_group_array(artistId) FROM track_artists WHERE trackId = t.id) as artistIds
      FROM tracks t
      JOIN playlist_tracks pt ON t.id = pt.trackId
      WHERE pt.playlistId = ?
      ORDER BY pt.orderIndex ASC
    `,
      [playlistId],
    );

    return rows.map(TrackMapper.toDomain);
  }

  async removeTrackFromPlaylist(
    playlistId: string,
    trackId: string,
  ): Promise<void> {
    await this.db.withTransactionAsync(async () => {
      await this.db.runAsync(
        "DELETE FROM playlist_tracks WHERE playlistId = ? AND trackId = ?",
        [playlistId, trackId],
      );

      await this.db.runAsync(
        "UPDATE playlists SET trackCount = trackCount - 1, updatedAt = ? WHERE id = ?",
        [Date.now(), playlistId],
      );
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.runAsync("DELETE FROM playlists WHERE id = ?", [id]);
  }

  async getLatestTrackArtwork(playlistId: string): Promise<string | null> {
    const row = await this.db.getFirstAsync<{ artworkUri: string }>(
      `SELECT t.artworkUri 
     FROM tracks t
     JOIN playlist_tracks pt ON t.id = pt.trackId
     WHERE pt.playlistId = ?
     ORDER BY pt.orderIndex DESC LIMIT 1`,
      [playlistId],
    );
    return row?.artworkUri || null;
  }

  async updateArtwork(
    playlistId: string,
    artworkUri: string | null,
  ): Promise<void> {
    await this.db.runAsync(
      "UPDATE playlists SET artworkUri = ?, updatedAt = ? WHERE id = ?",
      [artworkUri, Date.now(), playlistId],
    );
  }
}
