import { SQLiteDatabase } from "expo-sqlite";
import { AlbumRepository } from "@interfaces/album.repository";
import { Album } from "@entities/album.entity";
import { AlbumMapper } from "@mappers/album.mapper";

export class SQLiteAlbumRepository implements AlbumRepository {
  constructor(private db: SQLiteDatabase) {}

  private readonly BASE_SELECT = `
    SELECT a.*, 
      (SELECT json_group_array(artistId) FROM album_artists WHERE albumId = a.id) as artistIds
    FROM albums a
  `;

  async save(album: Album): Promise<void> {
    const p = AlbumMapper.toPersistence(album);

    await this.db.withTransactionAsync(async () => {
      await this.db.runAsync(
        `INSERT OR REPLACE INTO albums 
        (id, title, artistId, artistName, artworkUri, year, trackCount, playCount) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id,
          p.title,
          p.artistId,
          p.artistName,
          p.artworkUri,
          p.year,
          p.trackCount,
          p.playCount,
        ] as any[],
      );

      await this.db.runAsync("DELETE FROM album_artists WHERE albumId = ?", [
        p.id,
      ]);

      for (const aId of album.artistIds) {
        await this.db.runAsync(
          "INSERT INTO album_artists (albumId, artistId) VALUES (?, ?)",
          [p.id, aId],
        );
      }
    });
  }

  async findById(id: string): Promise<Album | null> {
    const row = await this.db.getFirstAsync<any>(
      `${this.BASE_SELECT} WHERE a.id = ?`,
      [id],
    );
    return row ? AlbumMapper.toDomain(row) : null;
  }

  async findByNameAndArtist(
    title: string,
    artistId: string,
  ): Promise<Album | null> {
    const row = await this.db.getFirstAsync<any>(
      `${this.BASE_SELECT} WHERE LOWER(a.title) = ? AND a.artistId = ?`,
      [title.toLowerCase(), artistId],
    );
    return row ? AlbumMapper.toDomain(row) : null;
  }

  async findAll(): Promise<Album[]> {
    const rows = await this.db.getAllAsync<any>(
      `${this.BASE_SELECT} ORDER BY a.title ASC`,
    );
    return rows.map((row) => AlbumMapper.toDomain(row));
  }

  async delete(id: string): Promise<void> {
    await this.db.runAsync("DELETE FROM albums WHERE id = ?", [id]);
  }

  async findByArtistId(
    artistId: string,
    artistName?: string,
  ): Promise<Album[]> {
    const searchName = artistName ? `%${artistName}%` : null;

    const query = `
      ${this.BASE_SELECT}
      LEFT JOIN album_artists aa ON a.id = aa.albumId
      WHERE a.artistId = ? 
         OR aa.artistId = ?
         ${searchName ? "OR a.artistName LIKE ?" : ""}
      GROUP BY a.id
      ORDER BY a.year DESC, a.title ASC
    `;

    const params = searchName
      ? [artistId, artistId, searchName]
      : [artistId, artistId];

    const rows = await this.db.getAllAsync<any>(query, params);
    return rows.map((row) => AlbumMapper.toDomain(row));
  }

  async getRelatedAlbums(
    artistId: string,
    excludeAlbumId: string,
    limit: number = 5,
  ): Promise<Album[]> {
    const query = `
    ${this.BASE_SELECT}
    INNER JOIN album_artists aa ON a.id = aa.albumId
    WHERE aa.artistId = ? AND a.id != ? -- <--- FILTRO CRÍTICO
    LIMIT ?
  `;

    const rows = await this.db.getAllAsync<any>(query, [
      artistId,
      excludeAlbumId,
      limit,
    ]);
    return rows.map((row) => AlbumMapper.toDomain(row));
  }

  async search(query: string): Promise<Album[]> {
    const pattern = `%${query.toLowerCase()}%`;
    const results = await this.db.getAllAsync<any>(
      `${this.BASE_SELECT} 
       WHERE LOWER(a.title) LIKE ? 
          OR LOWER(a.artistName) LIKE ? 
       LIMIT 20`,
      [pattern, pattern],
    );
    return results.map((row) => AlbumMapper.toDomain(row));
  }

  async getRecentAlbums(limit: number): Promise<Album[]> {
    const query = `
    SELECT a.*, MAX(t.dateAdded) as lastAdded,
    (SELECT json_group_array(artistId) FROM album_artists WHERE albumId = a.id) as artistIds
    FROM albums a
    INNER JOIN tracks t ON a.id = t.albumId
    GROUP BY a.id
    ORDER BY lastAdded DESC
    LIMIT ?
  `;
    const rows = await this.db.getAllAsync<any>(query, [limit]);
    return rows.map(AlbumMapper.toDomain);
  }

  async getTopTrackCountAlbums(limit: number): Promise<Album[]> {
    const query = `
    ${this.BASE_SELECT}
    ORDER BY a.trackCount DESC
    LIMIT ?
  `;
    const rows = await this.db.getAllAsync<any>(query, [limit]);
    return rows.map(AlbumMapper.toDomain);
  }

  async getMostLikedAlbums(limit: number): Promise<Album[]> {
    const query = `
    SELECT a.*,
    (SELECT json_group_array(artistId) FROM album_artists WHERE albumId = a.id) as artistIds
    FROM albums a
    INNER JOIN tracks t ON a.id = t.albumId
    WHERE t.isFavorite = 1
    GROUP BY a.id
    ORDER BY COUNT(t.id) DESC
    LIMIT ?
  `;
    const rows = await this.db.getAllAsync<any>(query, [limit]);
    return rows.map(AlbumMapper.toDomain);
  }
}
