import { TrackRepository } from "@interfaces/track.repository";
import { Track } from "@entities/track.entity";
import { SQLiteDatabase } from "expo-sqlite";

export class SqliteTrackRepository implements TrackRepository {
  constructor(private db: SQLiteDatabase) {}

  async saveAll(tracks: Track[]): Promise<void> {
    await this.db.withTransactionAsync(async () => {
      for (const track of tracks) {
        await this.db.runAsync(
          `INSERT OR REPLACE INTO tracks 
        (
          id, url, title, artistName, albumName, 
          duration, format, bitrate, size, genre, 
          year, trackNumber, diskNumber, artworkUri, 
          isProcessed, dateAdded
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            track.id,
            track.url,
            track.title,
            track.artistName ?? "Artista Desconocido",
            track.albumName ?? "Álbum Desconocido",
            track.duration,
            track.format,
            track.bitrate ?? null, 
            track.size,
            track.genre ?? null,
            track.year ?? null,
            track.trackNumber ?? null,
            track.diskNumber ?? null,
            track.artworkUri ?? null,
            track.isProcessed ? 1 : 0,
            track.dateAdded,
          ],
        );
      }
    });
  }

  async getPendingTracks(): Promise<Track[]> {
    const results = await this.db.getAllAsync<any>(
      "SELECT * FROM tracks WHERE isProcessed = 0",
    );
    return results.map((row) => ({
      ...row,
      isProcessed: row.isProcessed === 1,
    }));
  }

  async updateMetadata(id: string, metadata: Partial<Track>): Promise<void> {
    const fields = Object.keys(metadata)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(metadata).map((v) =>
      typeof v === "boolean" ? (v ? 1 : 0) : v,
    );

    await this.db.runAsync(`UPDATE tracks SET ${fields} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }

  async deleteAll(): Promise<void> {
    await this.db.runAsync("DELETE FROM tracks");
  }
}
