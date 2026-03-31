import { TrackRepository } from "@interfaces/track.repository";
import { Track } from "@entities/track.entity";
import { SQLiteDatabase } from "expo-sqlite";
import { TrackMapper } from "@mappers/track.mapper";

export class SqliteTrackRepository implements TrackRepository {
  constructor(private db: SQLiteDatabase) {}

  async saveAll(tracks: Track[]): Promise<void> {
    await this.db.withTransactionAsync(async () => {
      for (const track of tracks) {
        const p = TrackMapper.toPersistence(track);

        await this.db.runAsync(
          `INSERT OR REPLACE INTO tracks 
          (
            id, url, title, artistId, albumId, artistName, albumName, 
            duration, format, bitrate, size, genre, year, trackNumber, diskNumber, 
            artworkUri, lyricsContent, lyricsType, lyricsSource,
            isFavorite, isProcessed, dateAdded, playCount
          ) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.id,
            p.url,
            p.title,
            p.artistId,
            p.albumId,
            p.artistName,
            p.albumName,
            p.duration,
            p.format,
            p.bitrate,
            p.size,
            p.genre,
            p.year,
            p.trackNumber,
            p.diskNumber,
            p.artworkUri,
            p.lyricsContent,
            p.lyricsType,
            p.lyricsSource,
            p.isFavorite,
            p.isProcessed,
            p.dateAdded,
            p.playCount,
          ] as any[],
        );

        await this.db.runAsync("DELETE FROM track_artists WHERE trackId = ?", [
          p.id,
        ]);

        for (const aId of track.artistIds) {
          await this.db.runAsync(
            "INSERT INTO track_artists (trackId, artistId) VALUES (?, ?)",
            [p.id, aId],
          );
        }
      }
    });
  }

  private readonly BASE_SELECT = `
    SELECT t.*, 
      (SELECT json_group_array(artistId) FROM track_artists WHERE trackId = t.id) as artistIds 
    FROM tracks t
  `;

  async getPendingTracks(): Promise<Track[]> {
    const results = await this.db.getAllAsync<any>(
      `${this.BASE_SELECT} WHERE t.isProcessed = 0`,
    );
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async updateMetadata(id: string, metadata: Partial<Track>): Promise<void> {
    const { lyrics, artistIds, ...rest } = metadata;
    const updateData: any = { ...rest };

    if (lyrics) {
      updateData.lyricsContent = lyrics.content;
      updateData.lyricsType = lyrics.type;
      updateData.lyricsSource = lyrics.source;
    }

    await this.db.withTransactionAsync(async () => {
      const keys = Object.keys(updateData);
      if (keys.length > 0) {
        const fields = keys.map((key) => `${key} = ?`).join(", ");
        const values = Object.values(updateData).map((v) =>
          typeof v === "boolean" ? (v ? 1 : 0) : v,
        );
        await this.db.runAsync(`UPDATE tracks SET ${fields} WHERE id = ?`, [
          ...values,
          id,
        ] as any[]);
      }

      if (artistIds) {
        await this.db.runAsync("DELETE FROM track_artists WHERE trackId = ?", [
          id,
        ]);
        for (const aId of artistIds) {
          await this.db.runAsync(
            "INSERT INTO track_artists (trackId, artistId) VALUES (?, ?)",
            [id, aId],
          );
        }
      }
    });
  }

  async findAll(): Promise<Track[]> {
    const results = await this.db.getAllAsync<any>(
      `${this.BASE_SELECT} ORDER BY t.title ASC`,
    );
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async findById(id: string): Promise<Track | null> {
    const row = await this.db.getFirstAsync<any>(
      `${this.BASE_SELECT} WHERE t.id = ?`,
      [id],
    );
    return row ? TrackMapper.toDomain(row) : null;
  }

  async getTracksByAlbumId(albumId: string): Promise<Track[]> {
    const results = await this.db.getAllAsync<any>(
      `${this.BASE_SELECT} WHERE t.albumId = ? ORDER BY t.trackNumber ASC`,
      [albumId],
    );
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async deleteAll(): Promise<void> {
    await this.db.runAsync("DELETE FROM tracks");
  }

  async findByArtistId(
    artistId: string,
    artistName?: string,
  ): Promise<Track[]> {
    const searchPattern = artistName ? `%${artistName}%` : null;

    const query = `
      SELECT t.*, 
        (SELECT json_group_array(artistId) FROM track_artists WHERE trackId = t.id) as artistIds 
      FROM tracks t
      WHERE t.artistId = ? 
         OR t.id IN (SELECT trackId FROM track_artists WHERE artistId = ?)
         ${searchPattern ? "OR t.artistName LIKE ?" : ""} 
      ORDER BY t.dateAdded DESC, t.title ASC
    `;

    const params = searchPattern
      ? [artistId, artistId, searchPattern]
      : [artistId, artistId];

    const results = await this.db.getAllAsync<any>(query, params);
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async search(query: string): Promise<Track[]> {
    const pattern = `%${query.toLowerCase()}%`;
    const results = await this.db.getAllAsync<any>(
      `${this.BASE_SELECT} 
       WHERE LOWER(t.title) LIKE ? 
          OR LOWER(t.artistName) LIKE ? 
       ORDER BY t.title ASC 
       LIMIT 50`,
      [pattern, pattern],
    );
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async getLeastPlayedTracks(limit: number): Promise<Track[]> {
    const query = `
    ${this.BASE_SELECT}
    WHERE t.isProcessed = 1
    ORDER BY t.playCount ASC, t.dateAdded DESC
    LIMIT ?
  `;

    const results = await this.db.getAllAsync<any>(query, [limit]);
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async getNeverPlayedTracks(limit: number): Promise<Track[]> {
    const query = `
    ${this.BASE_SELECT}
    WHERE t.playCount = 0 AND t.isProcessed = 1
    ORDER BY t.dateAdded DESC
    LIMIT ?
  `;

    const results = await this.db.getAllAsync<any>(query, [limit]);
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async getLongestTracks(limit: number): Promise<Track[]> {
    const query = `
    ${this.BASE_SELECT}
    WHERE t.isProcessed = 1
    ORDER BY t.duration DESC
    LIMIT ?
  `;

    const results = await this.db.getAllAsync<any>(query, [limit]);
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async getFavoriteTracksCount(): Promise<number> {
    const result = await this.db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM tracks WHERE isFavorite = 1 AND isProcessed = 1",
    );
    return result?.count || 0;
  }

  async getForgottenFavorites(limit: number): Promise<Track[]> {
    const query = `
    ${this.BASE_SELECT}
    WHERE t.isFavorite = 1 AND t.isProcessed = 1
    ORDER BY t.playCount ASC, t.dateAdded DESC
    LIMIT ?
  `;

    const results = await this.db.getAllAsync<any>(query, [limit]);
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async getMostPlayedTracks(limit: number): Promise<Track[]> {
  const query = `
    ${this.BASE_SELECT}
    WHERE t.isProcessed = 1
    ORDER BY t.playCount DESC, t.title ASC
    LIMIT ?
  `;

  const results = await this.db.getAllAsync<any>(query, [limit]);
  return results.map((row) => TrackMapper.toDomain(row));
}
}
