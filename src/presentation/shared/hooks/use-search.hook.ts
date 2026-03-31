import { useState, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SearchUseCase } from "@use-cases/search/search.use-case";
import { SearchResults } from "@dtos/search-results.dto";
import { SMART_FILTERS } from "@constants/smart-filter.constants";

export const useDiscovery = () => {
  const db = useSQLiteContext();
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const executeSearch = useCallback(async (query: string) => {
    // 1. Identificar si el query es un filtro inteligente
    const smartFilter = SMART_FILTERS.find(f => f.title === query || f.key === query);
    
    setIsLoading(true);
    try {
      const trackRepo = new SqliteTrackRepository(db);
      const artistRepo = new SqliteArtistRepository(db);
      const albumRepo = new SQLiteAlbumRepository(db);

      if (smartFilter) {
        // --- LOGICA DE FILTROS INTELIGENTES ---
        console.log("LOG: Ejecutando Filtro Inteligente:", smartFilter.key);
        
        // Aquí llamarás a otro Use Case en el futuro, ej:
        // const smartUseCase = new SmartFilterUseCase(trackRepo);
        // const data = await smartUseCase.execute(smartFilter.key);
        // setResults({ tracks: data, artists: [], albums: [] });
        
      } else {
        // --- LOGICA DE BUSQUEDA NORMAL ---
        const searchUseCase = new SearchUseCase(trackRepo, artistRepo, albumRepo);
        const data = await searchUseCase.execute(query);
        setResults(data);
      }
    } catch (error) {
      console.error("[useDiscovery] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  return {
    results,
    isLoading,
    executeSearch,
    // Podrías devolver también una función para limpiar resultados
    clearResults: () => setResults(null)
  };
};