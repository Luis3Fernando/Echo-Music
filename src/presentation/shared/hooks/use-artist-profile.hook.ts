import { useState, useEffect, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { DeezerMusicService } from "@services/deezer-music.service";
import { GetOrCreateArtistUseCase } from "@use-cases/artists/get-or-create-artist.use-case";
import {
  GetArtistProfileUseCase,
  ArtistProfile,
} from "@use-cases/artists/get-artist-profile.use-case";

export const useArtistProfile = (artistName: string) => {
  const db = useSQLiteContext();
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!artistName) return;

    setIsLoading(true);
    setError(null);

    try {
      const artistRepo = new SqliteArtistRepository(db);
      const trackRepo = new SqliteTrackRepository(db);
      const albumRepo = new SQLiteAlbumRepository(db);
      const externalService = new DeezerMusicService();
      const getOrCreateArtist = new GetOrCreateArtistUseCase(
        artistRepo,
        externalService,
      );

      const useCase = new GetArtistProfileUseCase(
        getOrCreateArtist,
        trackRepo,
        albumRepo,
        artistRepo,
      );

      const data = await useCase.execute(artistName);
      setProfile(data);
    } catch (err) {
      console.error("[useArtistProfile] Error:", err);
      setError("No se pudo cargar el perfil del artista");
    } finally {
      setIsLoading(false);
    }
  }, [db, artistName]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    artist: profile?.artist,
    tracks: profile?.tracks || [],
    albums: profile?.albums || [],
    collaborators: profile?.collaborators || [],
    isLoading,
    error,
    refresh: loadProfile,
  };
};
