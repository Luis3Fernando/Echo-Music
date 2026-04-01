import { useState, useEffect, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { GetAllTracksUseCase } from "@use-cases/tracks/get-all-tracks.use-case";
import { Track } from "@entities/track.entity";
import { useAppConfigStore } from "@store/use-config.store";

export const useLibrary = () => {
  const db = useSQLiteContext();
  const [songs, setSongs] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sortOrder = useAppConfigStore((state) => state.config.trackSortOrder);

  const fetchSongs = useCallback(async () => {
    setIsLoading(true);
    try {
      const repository = new SqliteTrackRepository(db);
      const useCase = new GetAllTracksUseCase(repository);

      const result = await useCase.execute(sortOrder);
      setSongs(result);
    } catch (error) {
      console.error("[useLibrary] Error al cargar canciones:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db, sortOrder]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return {
    songs,
    isLoading,
    refreshSongs: fetchSongs,
  };
};
