import { useState, useCallback } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { SqliteArtistRepository } from '@repositories/sqlite-artist.repository';
import { DeezerMusicService } from '@services/deezer-music.service';
import { GetOrCreateArtistUseCase } from '@use-cases/artists/get-or-create-artist.use-case';
import { Artist } from '@entities/artist.entity';

const artistCache: Record<string, Artist> = {};

export const useArtist = () => {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);

  const fetchArtist = useCallback(async (name: string): Promise<Artist | null> => {
    if (!name) return null;
    
    if (artistCache[name]) {
      return artistCache[name];
    }

    setLoading(true);
    try {
      const repo = new SqliteArtistRepository(db);
      const api = new DeezerMusicService();
      const useCase = new GetOrCreateArtistUseCase(repo, api);

      const result = await useCase.execute(name);
      
      if (result) {
        artistCache[name] = result;
      }

      return result;
    } catch (error) {
      console.error("[useArtist] Error fatal:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [db]);

  return { fetchArtist, loading };
};