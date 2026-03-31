import { useState, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { DeezerMusicService } from "@services/deezer-music.service";
import { GetOrCreateArtistUseCase } from "@use-cases/artists/get-or-create-artist.use-case";
import { UpdateArtistImageUseCase } from "@use-cases/artists/update-artist-image.use-case";
import { GetTopTrackCountArtistsUseCase } from "@use-cases/artists/get-top-track-count-artists.use-case";
import { GetMostLikedArtistsUseCase } from "@use-cases/artists/get-most-liked-artists.use-case";
import { GetTopPlayedArtistsUseCase } from "@use-cases/artists/get-top-played-artists.use-case";
import { Artist } from "@entities/artist.entity";

const artistCache: Record<string, Artist> = {};

export const useArtist = () => {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);

  const fetchArtist = useCallback(
    async (name: string): Promise<Artist | null> => {
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
        console.error("[useArtist] Error:", error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [db],
  );

  const updateImage = useCallback(
    async (artistId: string, temporaryUri: string): Promise<string | null> => {
      try {
        const repo = new SqliteArtistRepository(db);
        const useCase = new UpdateArtistImageUseCase(repo);

        const permanentUri = await useCase.execute(artistId, temporaryUri);

        const cachedName = Object.keys(artistCache).find(
          (name) => artistCache[name].id === artistId,
        );
        if (cachedName && artistCache[cachedName]) {
          artistCache[cachedName] = {
            ...artistCache[cachedName],
            pictureUrl: permanentUri,
          };
        }

        return permanentUri;
      } catch (error) {
        console.error("[useArtist] Error:", error);
        return null;
      }
    },
    [db],
  );

  return { fetchArtist, updateImage, loading };
};

export const useHomeArtists = () => {
  const db = useSQLiteContext();
  
  const [topTrackArtists, setTopTrackArtists] = useState<Artist[]>([]);
  const [likedArtists, setLikedArtists] = useState<Artist[]>([]);
  const [topPlayedArtists, setTopPlayedArtists] = useState<Artist[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);

  const fetchHomeArtists = useCallback(async () => {
    setIsLoading(true);
    try {
      const repo = new SqliteArtistRepository(db);
      
      const topTrackUseCase = new GetTopTrackCountArtistsUseCase(repo);
      const likedUseCase = new GetMostLikedArtistsUseCase(repo);
      const topPlayedUseCase = new GetTopPlayedArtistsUseCase(repo);

      const [topTrack, liked, topPlayed] = await Promise.all([
        topTrackUseCase.execute(10),
        likedUseCase.execute(10),
        topPlayedUseCase.execute(10)
      ]);

      setTopTrackArtists(topTrack);
      setLikedArtists(liked);
      setTopPlayedArtists(topPlayed);
    } catch (error) {
      console.error("[useHomeArtists] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchHomeArtists();
  }, [fetchHomeArtists]);

  return { 
    topTrackArtists, 
    likedArtists, 
    topPlayedArtists, 
    isLoading, 
    refresh: fetchHomeArtists 
  };
};