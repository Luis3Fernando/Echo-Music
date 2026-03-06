import { ExternalMusicService } from "@interfaces-services/external-music.service";
import { Artist } from "@entities/artist.entity";
import { deezerArtistMapper } from "@mappers/deezer-artist.mapper";

export class DeezerMusicService implements ExternalMusicService {
  private readonly BASE_URL = "https://api.deezer.com";

  async searchArtist(name: string): Promise<Artist[]> {
    const response = await fetch(`${this.BASE_URL}/search/artist?q=${encodeURIComponent(name)}`);
    const json = await response.json();
    return (json.data || []).map(deezerArtistMapper.toDomain);
  }
}