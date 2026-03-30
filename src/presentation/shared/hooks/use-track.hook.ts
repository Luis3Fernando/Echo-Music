import { useState, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SqlitePlaylistRepository } from "@repositories/sqlite-playlist.repository";
import { ToggleFavoriteUseCase } from "@use-cases/tracks/toggle-favorite.use-case";

export const useTrack = () => {
  const db = useSQLiteContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleFavorite = useCallback(async (trackId: string) => {
    if (isProcessing) return null;
    
    setIsProcessing(true);
    try {
      const trackRepo = new SqliteTrackRepository(db);
      const playlistRepo = new SqlitePlaylistRepository(db);
      const useCase = new ToggleFavoriteUseCase(trackRepo, playlistRepo);

      const newState = await useCase.execute(trackId);
      return newState;
    } catch (error) {
      console.error("[useTrack] Error toggling favorite:", error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [db, isProcessing]);

  return {
    toggleFavorite,
    isProcessing
  };
};