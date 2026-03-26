import { SQLiteDatabase } from "expo-sqlite";
import { AlbumRepository } from "@/domain/repositories/album.repository";
import { Album } from "@/domain/entities/album.entity";
import { AlbumMapper } from "../mappers/album.mapper";

export class SQLiteAlbumRepository implements AlbumRepository {
  constructor(private db: SQLiteDatabase) {}

  async findByNameAndArtist(
    title: string,
    artistId: string,
  ): Promise<Album | null> {
    const row = await this.db.getFirstAsync(
      "SELECT * FROM albums WHERE title = ? AND artistId = ?",
      [title, artistId],
    );
    return row ? AlbumMapper.toDomain(row) : null;
  }

  async save(album: Album): Promise<void> {
    const p = AlbumMapper.toPersistence(album);

    await this.db.runAsync(
      `INSERT OR REPLACE INTO albums 
    (id, title, artistId, artistName, artworkUri, year, trackCount, isCompilation, folderPath) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id,
        p.title,
        p.artistId,
        p.artistName,
        p.artworkUri,
        p.year,
        p.trackCount,
        p.isCompilation,
        p.folderPath,
      ],
    );
  }

  async findById(id: string): Promise<Album | null> {
    const row = await this.db.getFirstAsync(
      "SELECT * FROM albums WHERE id = ?",
      [id],
    );
    return row ? AlbumMapper.toDomain(row) : null;
  }

  async findAll(): Promise<Album[]> {
    const rows = await this.db.getAllAsync(
      "SELECT * FROM albums ORDER BY title ASC",
    );
    return rows.map((row) => AlbumMapper.toDomain(row));
  }

  async delete(id: string): Promise<void> {
    await this.db.runAsync("DELETE FROM albums WHERE id = ?", [id]);
  }
}
