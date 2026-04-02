import { useState, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Album } from "@entities/album.entity";
import { Track } from "@entities/track.entity";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { GetAlbumDetailsUseCase } from "@use-cases/albums/get-album-details.use-case";
import { GetRelatedAlbumsUseCase } from "@use-cases/albums/get-related-albums.use-case";
import { GetRecentAlbumsUseCase } from "@use-cases/albums/get-recent-albums.use-case";
import { GetTopTrackCountAlbumsUseCase } from "@use-cases/albums/get-top-track-count-albums.use-case";
import { GetMostLikedAlbumsUseCase } from "@use-cases/albums/get-most-liked-albums.use-case";

export const useAlbumDetail = (albumId: string) => {
  const db = useSQLiteContext();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbumDetails = useCallback(async () => {
    if (!albumId) return;
    if (!album) setIsLoading(true);
    setError(null);

    try {
      const albumRepo = new SQLiteAlbumRepository(db);
      const trackRepo = new SqliteTrackRepository(db);
      const useCase = new GetAlbumDetailsUseCase(albumRepo, trackRepo);

      const { album: albumData, tracks: tracksData } =
        await useCase.execute(albumId);

      setAlbum(albumData);
      setTracks(tracksData);
    } catch (err: any) {
      console.error("[useAlbumDetail] Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [db, albumId, album]);

  useEffect(() => {
    fetchAlbumDetails();
  }, [albumId]);

  return { album, tracks, setTracks, isLoading, error, refresh: fetchAlbumDetails };
};

export const useRelatedAlbums = (artistId?: string, currentAlbumId?: string) => {
  const db = useSQLiteContext();
  const [relatedAlbums, setRelatedAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadRelated = useCallback(async () => {
    if (!artistId || !currentAlbumId) return;
    setIsLoading(true);
    try {
      const repo = new SQLiteAlbumRepository(db);
      const useCase = new GetRelatedAlbumsUseCase(repo);
      const data = await useCase.execute(artistId, currentAlbumId);
      setRelatedAlbums(data);
    } catch (error) {
      console.error("[useRelatedAlbums] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db, artistId, currentAlbumId]);

  useEffect(() => {
    loadRelated();
  }, [loadRelated]);

  return { relatedAlbums, isLoading };
};

export const useHomeAlbums = () => {
  const db = useSQLiteContext();
  
  const [recentAlbums, setRecentAlbums] = useState<Album[]>([]);
  const [topCountAlbums, setTopCountAlbums] = useState<Album[]>([]);
  const [mostLikedAlbums, setMostLikedAlbums] = useState<Album[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);

  const fetchHomeAlbums = useCallback(async () => {
    setIsLoading(true);
    try {
      const repo = new SQLiteAlbumRepository(db);
      
      const recentUseCase = new GetRecentAlbumsUseCase(repo);
      const topCountUseCase = new GetTopTrackCountAlbumsUseCase(repo);
      const mostLikedUseCase = new GetMostLikedAlbumsUseCase(repo);

      const [recent, top, liked] = await Promise.all([
        recentUseCase.execute(10),
        topCountUseCase.execute(10),
        mostLikedUseCase.execute(10)
      ]);

      setRecentAlbums(recent);
      setTopCountAlbums(top);
      setMostLikedAlbums(liked);
    } catch (error) {
      console.error("[useHomeAlbums] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    fetchHomeAlbums();
  }, [fetchHomeAlbums]);

  return { 
    recentAlbums, 
    topCountAlbums, 
    mostLikedAlbums, 
    isLoading, 
    refresh: fetchHomeAlbums 
  };
};