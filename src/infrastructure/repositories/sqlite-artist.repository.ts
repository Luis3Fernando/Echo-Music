import { SQLiteDatabase } from "expo-sqlite";
import { Artist } from "@entities/artist.entity";
import { ArtistRepository } from "@interfaces/artist.repository";
import { ArtistMapper } from "@mappers/artist.mapper";

export class SqliteArtistRepository implements ArtistRepository {
  constructor(private db: SQLiteDatabase) {}

  async save(artist: Artist): Promise<void> {
    const p = ArtistMapper.toPersistence(artist);

    await this.db.runAsync(
      `INSERT OR REPLACE INTO artists 
      (id, name, pictureUrl, description, socialLinks, reels, isProcessed) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id, 
        p.name, 
        p.pictureUrl, 
        p.description, 
        p.socialLinks, 
        p.reels, 
        p.isProcessed
      ] as any[]
    );
  }

  async findByName(name: string): Promise<Artist | null> {
    const result = await this.db.getFirstAsync<any>(
      "SELECT * FROM artists WHERE name = ?",
      [name]
    );
    return result ? ArtistMapper.toDomain(result) : null;
  }

  async findById(id: string): Promise<Artist | null> {
    const result = await this.db.getFirstAsync<any>(
      "SELECT * FROM artists WHERE id = ?",
      [id]
    );
    return result ? ArtistMapper.toDomain(result) : null;
  }

  async findAll(): Promise<Artist[]> {
    const results = await this.db.getAllAsync<any>(
      "SELECT * FROM artists ORDER BY name ASC"
    );
    return results.map(row => ArtistMapper.toDomain(row));
  }
}