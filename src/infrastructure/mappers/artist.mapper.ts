import { Artist } from "@entities/artist.entity";

export const ArtistMapper = {
  toDomain(row: any): Artist {
    return {
      id: row.id,
      name: row.name,
      pictureUrl: row.pictureUrl,
      description: row.description || null,
      socialLinks: row.socialLinks ? JSON.parse(row.socialLinks) : [],
      reels: row.reels ? JSON.parse(row.reels) : [],
      isProcessed: row.isProcessed === 1,
    };
  },

  toPersistence(artist: Artist) {
    return {
      id: artist.id,
      name: artist.name,
      pictureUrl: artist.pictureUrl ?? '',
      description: artist.description ?? null,
      socialLinks: artist.socialLinks ? JSON.stringify(artist.socialLinks) : JSON.stringify([]),
      reels: artist.reels ? JSON.stringify(artist.reels) : JSON.stringify([]),
      isProcessed: artist.isProcessed ? 1 : 0,
    };
  }
};