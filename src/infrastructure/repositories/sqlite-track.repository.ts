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
            duration, format, size, artworkUri, 
            lyricsContent, lyricsType, lyricsSource,
            isFavorite, isProcessed, dateAdded, playCount
          ) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            p.size,
            p.artworkUri,
            p.lyricsContent,
            p.lyricsType,
            p.lyricsSource,
            p.isFavorite,
            p.isProcessed,
            p.dateAdded,
            p.playCount,
          ],
        );
      }
    });
  }

  async getPendingTracks(): Promise<Track[]> {
    const results = await this.db.getAllAsync<any>(
      "SELECT * FROM tracks WHERE isProcessed = 0",
    );
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async updateMetadata(id: string, metadata: Partial<Track>): Promise<void> {
    const { lyrics, ...rest } = metadata;
    const updateData: any = { ...rest };

    if (lyrics) {
      updateData.lyricsContent = lyrics.content;
      updateData.lyricsType = lyrics.type;
      updateData.lyricsSource = lyrics.source;
    }

    const keys = Object.keys(updateData);
    if (keys.length === 0) return;

    const fields = keys.map((key) => `${key} = ?`).join(", ");
    const values = Object.values(updateData).map((v) =>
      typeof v === "boolean" ? (v ? 1 : 0) : v,
    );

    await this.db.runAsync(`UPDATE tracks SET ${fields} WHERE id = ?`, [
      ...values,
      id,
    ] as any[]);
  }

  async findAll(): Promise<Track[]> {
    const results = await this.db.getAllAsync<any>(
      "SELECT * FROM tracks ORDER BY title ASC",
    );
    return results.map((row) => TrackMapper.toDomain(row));
  }

  async findById(id: string): Promise<Track | null> {
    const row = await this.db.getFirstAsync<any>(
      "SELECT * FROM tracks WHERE id = ?",
      [id],
    );
    return row ? TrackMapper.toDomain(row) : null;
  }

  async deleteAll(): Promise<void> {
    await this.db.runAsync("DELETE FROM tracks");
  }
}
