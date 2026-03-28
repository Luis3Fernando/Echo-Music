import { Playlist } from "@entities/playlist.entity";

export const PlaylistMapper = {
  toDomain(row: any): Playlist {
    return {
      id: row.id,
      name: row.name,
      artworkUri: row.artworkUri || null,
      isUserCreated: row.isUserCreated === 1,
      trackCount: row.trackCount || 0,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  },

  toPersistence(playlist: Playlist) {
    return {
      id: playlist.id,
      name: playlist.name,
      artworkUri: playlist.artworkUri || null,
      isUserCreated: playlist.isUserCreated ? 1 : 0,
      trackCount: playlist.trackCount,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
    };
  }
};