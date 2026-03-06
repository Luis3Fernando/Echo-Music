import { SQLiteDatabase } from "expo-sqlite";
import { Artist } from "../../domain/entities/artist.entity";
import { ArtistRepository } from "../../domain/repositories/artist.repository";

export class SqliteArtistRepository implements ArtistRepository {
  constructor(private db: SQLiteDatabase) {}

  async save(artist: Artist): Promise<void> {
    const socialLinks = artist.socialLinks ? JSON.stringify(artist.socialLinks) : null;
    const reels = artist.reels ? JSON.stringify(artist.reels) : null;

    await this.db.runAsync(
      `INSERT OR REPLACE INTO artists 
      (id, name, pictureUrl, description, socialLinks, reels, isProcessed) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        artist.id,
        artist.name,
        artist.pictureUrl,
        artist.description ?? null,
        socialLinks,
        reels,
        artist.isProcessed ? 1 : 0
      ]
    );
  }

  async findById(id: string): Promise<Artist | null> {
    const result = await this.db.getFirstAsync<any>(
      "SELECT * FROM artists WHERE id = ?",
      [id]
    );

    if (!result) return null;

    return {
      ...result,
      socialLinks: result.socialLinks ? JSON.parse(result.socialLinks) : null,
      reels: result.reels ? JSON.parse(result.reels) : null,
      isProcessed: result.isProcessed === 1
    };
  }

  async findAll(): Promise<Artist[]> {
    const results = await this.db.getAllAsync<any>("SELECT * FROM artists ORDER BY name ASC");
    return results.map(row => ({
      ...row,
      socialLinks: row.socialLinks ? JSON.parse(row.socialLinks) : null,
      reels: row.reels ? JSON.parse(row.reels) : null,
      isProcessed: row.isProcessed === 1
    }));
  }
}