import { useEffect, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useLibraryStore } from "@store/use-library.store";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SqliteArtistRepository } from "@repositories/sqlite-artist.repository";
import { SQLiteAlbumRepository } from "@repositories/sqlite-album.repository";
import { SqlitePlaylistRepository } from "@repositories/sqlite-playlist.repository";
import { SyncLibraryUseCase } from "@/application/use-cases/init-app/sync-library.use-case";
import { CreateInitialPlaylistsUseCase } from "@/application/use-cases/init-app/create-initial-playlists.use-case";

export const useLibrary = () => {
  const db = useSQLiteContext();

  const {
    tracks,
    isScanning,
    scanProgress,
    totalTracks,
    setTracks,
    setScanning,
    setScanProgress,
  } = useLibraryStore();

  const loadSongs = useCallback(async () => {
    const repository = new SqliteTrackRepository(db);
    const allTracks = await repository.findAll();
    setTracks(allTracks);
  }, [db, setTracks]);

  const startScan = async () => {
    if (isScanning) return;

    const trackRepo = new SqliteTrackRepository(db);
    const artistRepo = new SqliteArtistRepository(db);
    const albumRepo = new SQLiteAlbumRepository(db);
    const playlistRepo = new SqlitePlaylistRepository(db);

    const syncUseCase = new SyncLibraryUseCase(
      trackRepo, 
      artistRepo, 
      albumRepo
    );

    const initialPlaylistsUseCase = new CreateInitialPlaylistsUseCase(
      playlistRepo, 
      trackRepo
    );

    try {
      setScanning(true);
      await syncUseCase.execute((percent) => {
        setScanProgress(percent);
      });

      await loadSongs();
      await initialPlaylistsUseCase.execute();

    } catch (error) {
      console.error("[useLibrary] Error crítico en el escaneo:", error);
    } finally {
      setScanning(false);
      setScanProgress(0);
    }
  };

  useEffect(() => {
    loadSongs();
  }, [loadSongs]);

  return {
    songs: tracks,
    isScanning,
    scanProgress,
    totalTracks,
    refreshSongs: loadSongs,
    startScan,
  };
};