import { AlbumRepository } from "@interfaces/album.repository";
import { Album } from "@entities/album.entity";

export class GetTopTrackCountAlbumsUseCase {
  constructor(private albumRepo: AlbumRepository) {}

  async execute(limit: number = 10): Promise<Album[]> {
    return await this.albumRepo.getTopTrackCountAlbums(limit);
  }
}