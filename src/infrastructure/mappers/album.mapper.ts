import { Album } from "@entities/album.entity";

export const AlbumMapper = {
  toDomain(row: any): Album {
    return {
      id: row.id,
      title: row.title,
      artistId: row.artistId,
      artistIds: row.artistIds ? JSON.parse(row.artistIds) : [row.artistId],
      artistName: row.artistName,
      artworkUri: row.artworkUri ?? null,
      year: row.year || null,
      trackCount: row.trackCount || 0,
      playCount: row.playCount || 0,
    };
  },

  toPersistence(album: Album) {
    return {
      id: album.id,
      title: album.title,
      artistId: album.artistId,
      artistName: album.artistName,
      artworkUri: album.artworkUri ?? null,
      year: album.year ?? null,
      trackCount: album.trackCount ?? 0,
      playCount: album.playCount ?? 0,
    };
  }
};