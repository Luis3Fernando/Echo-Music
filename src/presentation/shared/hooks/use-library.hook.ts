import { useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useLibraryStore } from '@store/use-library.store';
import { SqliteTrackRepository } from '@repositories/sqlite-track.repository';

export const useLibrary = () => {
  const db = useSQLiteContext();
  const { 
    tracks, 
    isScanning, 
    scanProgress, 
    totalTracks, 
    setTracks 
  } = useLibraryStore();

  const loadSongs = async () => {
    const repository = new SqliteTrackRepository(db);
    const allTracks = await repository.getPendingTracks();
    setTracks(allTracks);
  };

  useEffect(() => {
    loadSongs();
  }, []);

  return {
    songs: tracks,
    isScanning,
    scanProgress,
    totalTracks,
    refreshSongs: loadSongs
  };
};