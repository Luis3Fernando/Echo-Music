import { Folder } from "@entities/folder.entity";
import { Track } from "@entities/track.entity";

export interface FolderRepository {
  findAll(): Promise<Folder[]>;
  getTracksByFolder(folderPath: string): Promise<Track[]>;
}