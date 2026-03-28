import { useState, useEffect, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Playlist } from "@entities/playlist.entity";
import { GetAllPlaylistsUseCase } from "@use-cases/playlists/get-all-playlists.use-case";
import { SqlitePlaylistRepository } from "@repositories/sqlite-playlist.repository";

export const usePlaylists = () => {
  const db = useSQLiteContext();
  
  const [systemPlaylists, setSystemPlaylists] = useState<Playlist[]>([]);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaylists = useCallback(async () => {
    setIsLoading(true);
    try {
      const repo = new SqlitePlaylistRepository(db);
      const useCase = new GetAllPlaylistsUseCase(repo);
      
      const { systemPlaylists, userPlaylists } = await useCase.execute();
      
      setSystemPlaylists(systemPlaylists);
      setUserPlaylists(userPlaylists);
    } catch (error) {
      console.error("Error al cargar playlists en el hook:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return {
    systemPlaylists,
    userPlaylists,
    isLoading,
    refreshPlaylists: fetchPlaylists
  };
};