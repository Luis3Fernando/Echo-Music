import { create } from 'zustand';
import { Track } from '@entities/track.entity';

interface LibraryState {
  isScanning: boolean;
  scanProgress: number;
  totalTracks: number;
  tracks: Track[];
  
  setScanning: (isScanning: boolean) => void;
  setScanProgress: (progress: number) => void;
  setTotalTracks: (total: number) => void;
  setTracks: (tracks: Track[]) => void;
  resetScan: () => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  isScanning: false,
  scanProgress: 0,
  totalTracks: 0,
  tracks: [],

  setScanning: (isScanning) => set({ isScanning }),
  setScanProgress: (scanProgress) => set({ scanProgress }),
  setTotalTracks: (totalTracks) => set({ totalTracks }),
  setTracks: (tracks) => set({ tracks }),
  
  resetScan: () => set({ isScanning: false, scanProgress: 0 }),
}));