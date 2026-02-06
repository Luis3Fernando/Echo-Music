import db from "@database/SQLiteClient";
import { RawTrack } from "@models/Track";

export const TrackRepository = {
  async saveRawPaths(tracks: Partial<RawTrack>[]) {
    const query = `
      INSERT OR IGNORE INTO tracks 
      (id, file_uri, title, duration, is_processed, date_added) 
      VALUES (?, ?, ?, ?, 0, ?)
    `;

    for (const track of tracks) {
      await db.runAsync(query, [
        track.id ?? "",
        track.url ?? "",
        track.title || "Unknown",
        track.duration ?? 0,
        Date.now(),
      ]);
    }
  },

  async updateMetadata(id: string, meta: Partial<RawTrack>) {
    const query = `
      UPDATE tracks 
      SET artist = ?, album = ?, genre = ?, year = ?, artwork_uri = ?, is_processed = 1 
      WHERE id = ?
    `;
    await db.runAsync(query, [
      meta.artist ?? null,
      meta.album ?? null,
      meta.genre ?? null,
      meta.year ?? null,
      meta.artworkUri ?? null,
      id,
    ]);
  },

  async getPendingTracks(): Promise<RawTrack[]> {
    return await db.getAllAsync<RawTrack>(
      "SELECT id, file_uri as url, title, duration FROM tracks WHERE is_processed = 0",
    );
  },

  async getAllProcessed(): Promise<RawTrack[]> {
    return await db.getAllAsync<RawTrack>(
      "SELECT id, file_uri as url, title, artist, album, artwork_uri as artworkUri, duration FROM tracks WHERE is_processed = 1 ORDER BY date_added DESC"
    );
  }
};