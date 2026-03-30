import { useState, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Album } from "@entities/album.entity";
import { Track } from "@entities/track.entity";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { GetAlbumDetailsUseCase } from "@use-cases/albums/get-album-details.use-case";

export const useAlbumDetail = (albumId: string) => {
  const db = useSQLiteContext();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbumDetails = useCallback(async () => {
    if (!albumId) return;
    if (!album) setIsLoading(true);
    setError(null);

    try {
      const albumRepo = new SQLiteAlbumRepository(db);
      const trackRepo = new SqliteTrackRepository(db);
      const useCase = new GetAlbumDetailsUseCase(albumRepo, trackRepo);

      const { album: albumData, tracks: tracksData } =
        await useCase.execute(albumId);

      setAlbum(albumData);
      setTracks(tracksData);
    } catch (err: any) {
      console.error("[useAlbumDetail] Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [db, albumId, album]);

  useEffect(() => {
    fetchAlbumDetails();
  }, [albumId]);

  return { album, tracks, isLoading, error, refresh: fetchAlbumDetails };
};
