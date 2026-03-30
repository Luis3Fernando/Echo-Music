import { SQLiteDatabase } from "expo-sqlite";
import { Artist } from "@entities/artist.entity";
import { ArtistRepository } from "@interfaces/artist.repository";
import { ArtistMapper } from "@mappers/artist.mapper";

export class SqliteArtistRepository implements ArtistRepository {
  constructor(private db: SQLiteDatabase) {}

  async save(artist: Artist): Promise<void> {
    const p = ArtistMapper.toPersistence(artist);

    await this.db.runAsync(
      `INSERT INTO artists 
      (id, name, pictureUrl, description, socialLinks, reels, isProcessed) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        pictureUrl = excluded.pictureUrl,
        description = excluded.description,
        socialLinks = excluded.socialLinks,
        reels = excluded.reels,
        isProcessed = excluded.isProcessed`,
      [
        p.id,
        p.name,
        p.pictureUrl,
        p.description,
        p.socialLinks,
        p.reels,
        p.isProcessed,
      ] as any[],
    );
  }

  async findByName(name: string): Promise<Artist | null> {
    const row = await this.db.getFirstAsync<any>(
      "SELECT * FROM artists WHERE LOWER(name) = ?",
      [name.toLowerCase()],
    );
    return row ? ArtistMapper.toDomain(row) : null;
  }

  async findById(id: string): Promise<Artist | null> {
    const result = await this.db.getFirstAsync<any>(
      "SELECT * FROM artists WHERE id = ?",
      [id],
    );
    return result ? ArtistMapper.toDomain(result) : null;
  }

  async findByIds(ids: string[]): Promise<Artist[]> {
    if (ids.length === 0) return [];
    const placeholders = ids.map(() => "?").join(",");
    const query = `SELECT * FROM artists WHERE id IN (${placeholders})`;

    const results = await this.db.getAllAsync<any>(query, ids);
    return results.map((row) => ArtistMapper.toDomain(row));
  }

  async findAll(): Promise<Artist[]> {
    const results = await this.db.getAllAsync<any>(
      "SELECT * FROM artists ORDER BY name ASC",
    );
    return results.map((row) => ArtistMapper.toDomain(row));
  }
}