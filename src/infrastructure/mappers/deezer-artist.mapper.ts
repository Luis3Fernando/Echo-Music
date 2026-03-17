import { Artist } from "@entities/artist.entity";

export const deezerArtistMapper = {
  toDomain(raw: any): Artist {
    return {
      id: String(raw.id),
      name: raw.name,
      pictureUrl: raw.picture_big,
      description: null,
      socialLinks: null,
      reels: null,
      isProcessed: false
    };
  }
};