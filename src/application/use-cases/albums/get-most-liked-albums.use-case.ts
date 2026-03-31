import { AlbumRepository } from "@interfaces/album.repository";
import { Album } from "@entities/album.entity";

export class GetMostLikedAlbumsUseCase {
  constructor(private albumRepo: AlbumRepository) {}

  async execute(limit: number = 10): Promise<Album[]> {
    return await this.albumRepo.getMostLikedAlbums(limit);
  }
}