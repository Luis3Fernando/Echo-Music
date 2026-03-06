import { useState, useEffect, useCallback } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { SqliteTrackRepository } from '@repositories/sqlite-track.repository';
import { GetRecommendedTracksUseCase } from '@use-cases/get-recommended-tracks.use-case';

export const useRecommendations = () => {
  const db = useSQLiteContext();
  const [recommendedTracks, setRecommendedTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      
      const repository = new SqliteTrackRepository(db);
      const useCase = new GetRecommendedTracksUseCase(repository);
      
      const data = await useCase.execute();
      setRecommendedTracks(data);
    } catch (error) {
      console.error("[Hook] Error cargando recomendaciones:", error);
      setRecommendedTracks([]);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { 
    recommendedTracks, 
    loading, 
    refresh: fetchRecommendations 
  };
};