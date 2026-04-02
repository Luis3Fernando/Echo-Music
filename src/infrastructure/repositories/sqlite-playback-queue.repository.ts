import { SQLiteDatabase } from "expo-sqlite";
import { PlaybackQueueRepository } from "@interfaces/playback-queue.repository";
import { PlaybackQueue } from "@entities/queue.entity";
import { PlaybackQueueMapper } from "@mappers/playback-queue.mapper";

export class SqlitePlaybackQueueRepository implements PlaybackQueueRepository {
  constructor(private db: SQLiteDatabase) {}

  async get(): Promise<PlaybackQueue | null> {
    const row = await this.db.getFirstAsync<any>(
      "SELECT * FROM playback_queue WHERE id = 1"
    );
    if (!row) return null;
    return PlaybackQueueMapper.toDomain(row);
  }

  async save(queue: PlaybackQueue): Promise<void> {
    const p = PlaybackQueueMapper.toPersistence(queue);
    await this.db.runAsync(
      `INSERT OR REPLACE INTO playback_queue 
      (id, currentTrackId, tracks, shuffledTracks, isShuffle, repeatMode, currentIndex) 
      VALUES (1, ?, ?, ?, ?, ?, ?)`,
      [p.currentTrackId, p.tracks, p.shuffledTracks, p.isShuffle, p.repeatMode, p.currentIndex]
    );
  }

  async updateCurrentIndex(index: number): Promise<void> {
    await this.db.runAsync(
      "UPDATE playback_queue SET currentIndex = ? WHERE id = 1",
      [index]
    );
  }
}