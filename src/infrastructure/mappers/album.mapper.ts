import { Album } from "@entities/album.entity";

export const AlbumMapper = {
  toDomain(row: any): Album {
    return {
      id: row.id,
      title: row.title,
      artistId: row.artistId,
      artistName: row.artistName,
      artworkUri: row.artworkUri ?? null,
      year: row.year || null,
      trackCount: row.trackCount || 0,
      isCompilation: row.isCompilation === 1,
      folderPath: row.folderPath || undefined,
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
      isCompilation: album.isCompilation ? 1 : 0,
      folderPath: album.folderPath ?? null,
    };
  }
};