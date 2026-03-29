import { Folder } from "@entities/folder.entity";

export interface FolderRepository {
  findAll(): Promise<Folder[]>;
}