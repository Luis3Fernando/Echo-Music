import { useEffect, useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useLibraryStore } from "@store/use-library.store";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { SyncLibraryUseCase } from "@use-cases/sync-library.use-case";

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
    const allTracks = await repository.getPendingTracks();
    setTracks(allTracks);
  }, [db, setTracks]);

  const startScan = async () => {
    if (isScanning) return;

    const repository = new SqliteTrackRepository(db);
    const syncUseCase = new SyncLibraryUseCase(repository);

    try {
      setScanning(true);
      await syncUseCase.execute((percent) => {
        setScanProgress(percent);
      });

      await loadSongs();
    } catch (error) {
      console.error("[useLibrary] Error durante el escaneo:", error);
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
