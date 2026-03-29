import { SQLiteDatabase } from "expo-sqlite";
import { FolderRepository } from "@interfaces/folder.repository";
import { Folder } from "@entities/folder.entity";

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
}