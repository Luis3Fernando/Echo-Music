import { useEffect } from 'react';
import { useLibraryStore } from '../state/useLibraryStore';
import { TrackRepository } from '@/domain/repository/TrackRepository';

export const useLibrary = () => {
  const { 
    tracks, 
    setTracks, 
    isScanning, 
    scanProgress, 
    totalTracks 
  } = useLibraryStore();

  const loadSongsFromDb = async () => {
    const songs = await TrackRepository.getAllProcessed();
    setTracks(songs);
  };

  useEffect(() => {
    loadSongsFromDb();
  }, []);

  // ¡ESTA ES LA CLAVE! 
  // Refrescamos la lista cada vez que el progreso cambie
  useEffect(() => {
    if (isScanning) {
      loadSongsFromDb();
    }
  }, [scanProgress]); // Escucha el porcentaje para actualizar la lista en tiempo real

  return {
    songs: tracks,
    isScanning,
    scanProgress,
    totalTracks,
    refreshLibrary: loadSongsFromDb
  };
};