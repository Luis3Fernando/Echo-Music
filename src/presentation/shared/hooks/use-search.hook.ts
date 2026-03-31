import { useState, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SearchUseCase } from "@use-cases/search/search.use-case";
import { GetLeastPlayedTracksUseCase } from "@use-cases/search/get-least-played-tracks.use-case";
import { GetNeverPlayedTracksUseCase } from "@use-cases/search/get-never-played-tracks.use-case";
import { GetLongestTracksUseCase } from "@use-cases/search/get-longest-tracks.use-case";
import { GetForgottenFavoritesUseCase } from "@use-cases/search/get-forgotten-favorites-tracks.use-case";
import { SearchResults } from "@dtos/search-results.dto";
import { SMART_FILTERS } from "@constants/smart-filter.constants";
import { Track } from "@entities/track.entity";

export const useDiscovery = () => {
  const db = useSQLiteContext();
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const executeSearch = useCallback(
    async (query: string) => {
      const cleanQuery = query.trim();
      if (!cleanQuery) return;

      const smartFilter = SMART_FILTERS.find(
        (f) => f.title === query || f.key === query,
      );

      setIsLoading(true);
      try {
        const trackRepo = new SqliteTrackRepository(db);
        const artistRepo = new SqliteArtistRepository(db);
        const albumRepo = new SQLiteAlbumRepository(db);

        if (smartFilter) {
          let smartTracks: Track[] = [];
          switch (smartFilter.key) {
            case "SMART_LESS_PLAYED":
              smartTracks = await new GetLeastPlayedTracksUseCase(
                trackRepo,
              ).execute(50);
              break;
            case "SMART_NEVER_PLAYED":
              smartTracks = await new GetNeverPlayedTracksUseCase(
                trackRepo,
              ).execute(50);
              break;
            case "SMART_LONGEST":
              smartTracks = await new GetLongestTracksUseCase(
                trackRepo,
              ).execute(50);
              break;
            case "SMART_FORGOTTEN_FAVS":
              smartTracks = await new GetForgottenFavoritesUseCase(
                trackRepo,
              ).execute();
              break;
          }

          setResults({
            tracks: smartTracks,
            artists: [],
            albums: [],
          });
        } else {
          const searchUseCase = new SearchUseCase(
            trackRepo,
            artistRepo,
            albumRepo,
          );
          const data = await searchUseCase.execute(cleanQuery);
          setResults(data);
        }
      } catch (error) {
        console.error("[useDiscovery] Error fatal en búsqueda:", error);
        setResults({ tracks: [], artists: [], albums: [] });
      } finally {
        setIsLoading(false);
      }
    },
    [db],
  );

  const clearResults = useCallback(() => setResults(null), []);

  return {
    results,
    setResults,
    isLoading,
    executeSearch,
    clearResults,
  };
};
