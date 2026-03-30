import { SQLiteDatabase } from "expo-sqlite";
import { AlbumRepository } from "@interfaces/album.repository";
import { Album } from "@entities/album.entity";
import { AlbumMapper } from "@mappers/album.mapper";

export class SQLiteAlbumRepository implements AlbumRepository {
  constructor(private db: SQLiteDatabase) {}

  async findByNameAndArtist(
    title: string,
    artistId: string,
  ): Promise<Album | null> {
    const row = await this.db.getFirstAsync<any>(
      `SELECT a.*, 
        (SELECT json_group_array(artistId) FROM album_artists WHERE albumId = a.id) as artistIds
       FROM albums a 
       WHERE a.title = ? AND a.artistId = ?`,
      [title, artistId],
    );
    return row ? AlbumMapper.toDomain(row) : null;
  }

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
      `SELECT a.*, 
        (SELECT json_group_array(artistId) FROM album_artists WHERE albumId = a.id) as artistIds
       FROM albums a 
       WHERE a.id = ?`,
      [id],
    );
    return row ? AlbumMapper.toDomain(row) : null;
  }

  async findAll(): Promise<Album[]> {
    const rows = await this.db.getAllAsync<any>(
      `SELECT a.*, 
        (SELECT json_group_array(artistId) FROM album_artists WHERE albumId = a.id) as artistIds
       FROM albums a 
       ORDER BY a.title ASC`,
    );
    return rows.map((row) => AlbumMapper.toDomain(row));
  }

  async delete(id: string): Promise<void> {
    await this.db.runAsync("DELETE FROM albums WHERE id = ?", [id]);
  }

  async getAlbumsByArtist(
    artistId: string,
    excludeAlbumId?: string,
    limit: number = 5,
  ): Promise<Album[]> {
    const query = `
    SELECT a.*, 
      (SELECT json_group_array(artistId) FROM album_artists WHERE albumId = a.id) as artistIds
    FROM albums a 
    WHERE a.artistId = ? AND a.id != ?
    LIMIT ?
  `;

    const rows = await this.db.getAllAsync<any>(query, [
      artistId,
      excludeAlbumId || "",
      limit,
    ]);
    return rows.map((row) => AlbumMapper.toDomain(row));
  }
}
