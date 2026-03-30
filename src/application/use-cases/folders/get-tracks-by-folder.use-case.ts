import { FolderRepository } from "@interfaces/folder.repository";
import { Track } from "@entities/track.entity";

export class GetTracksByFolderUseCase {
  constructor(private folderRepo: FolderRepository) {}

  async execute(folderPath: string): Promise<Track[]> {
    if (!folderPath) {
      throw new Error("La ruta de la carpeta es obligatoria");
    }
    
    return await this.folderRepo.getTracksByFolder(folderPath);
  }
}