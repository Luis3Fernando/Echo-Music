import { AlbumRepository } from "@interfaces/album.repository";
import { Album } from "@entities/album.entity";

export class GetRelatedAlbumsUseCase {
  constructor(private albumRepo: AlbumRepository) {}

  async execute(artistId: string, currentAlbumId: string): Promise<Album[]> {
    if (!artistId) return [];
    return await this.albumRepo.getRelatedAlbums(artistId, currentAlbumId, 5);
  }
}