import { useState, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { LibraryStats, GetLibraryStatsUseCase } from "@use-cases/stats/get-library-stats.use-case";

export const useLibraryStats = () => {
  const db = useSQLiteContext();
  const [stats, setStats] = useState<LibraryStats>({
    totalTracks: 0,
    totalAlbums: 0,
    totalArtists: 0,
    neverPlayedCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const trackRepo = new SqliteTrackRepository(db);
      const albumRepo = new SQLiteAlbumRepository(db);
      const artistRepo = new SqliteArtistRepository(db);
      
      const useCase = new GetLibraryStatsUseCase(trackRepo, albumRepo, artistRepo);

      const data = await useCase.execute();
      setStats(data);
    } catch (error) {
      console.error("[useLibraryStats] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, refresh: fetchStats };
};