import { FolderRepository } from "@interfaces/folder.repository";
import { Folder } from "@entities/folder.entity";

export class GetAllFoldersUseCase {
  constructor(private folderRepo: FolderRepository) {}

  async execute(): Promise<Folder[]> {
    return await this.folderRepo.findAll();
  }
}