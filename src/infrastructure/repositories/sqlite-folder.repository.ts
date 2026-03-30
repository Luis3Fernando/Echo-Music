import { SQLiteDatabase } from "expo-sqlite";
import { FolderRepository } from "@interfaces/folder.repository";
import { Folder } from "@entities/folder.entity";
import { Track } from "@entities/track.entity";
import { TrackMapper } from "@mappers/track.mapper";

export class SqliteFolderRepository implements FolderRepository {
  constructor(private db: SQLiteDatabase) {}

  async findAll(): Promise<Folder[]> {
    const rows = await this.db.getAllAsync<{ url: string }>(
      "SELECT DISTINCT url FROM tracks"
    );

    const folderMap = new Map<string, Folder>();

    rows.forEach((row) => {
      const url = row.url.replace("file://", "");
      const path = url.substring(0, url.lastIndexOf("/"));
      const name = path.substring(path.lastIndexOf("/") + 1) || "Raíz";

      if (folderMap.has(path)) {
        const folder = folderMap.get(path)!;
        folder.trackCount += 1;
      } else {
        folderMap.set(path, {
          id: path,
          name: name,
          path: path,
          trackCount: 1,
        });
      }
    });

    return Array.from(folderMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getTracksByFolder(folderPath: string): Promise<Track[]> {
    const queryPath = `file://${folderPath}/%`;
    
    const rows = await this.db.getAllAsync<any>(
      `SELECT t.*, 
       (SELECT json_group_array(artistId) FROM track_artists WHERE trackId = t.id) as artistIds 
       FROM tracks t 
       WHERE t.url LIKE ? 
       ORDER BY t.title ASC`,
      [queryPath]
    );

    return rows.map(TrackMapper.toDomain);
  }
}