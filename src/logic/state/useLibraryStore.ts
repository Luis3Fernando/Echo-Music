import { create } from 'zustand';
import { RawTrack } from '@/domain/models/Track';

interface LibraryState {
  tracks: RawTrack[];
  isScanning: boolean;
  scanProgress: number;
  totalTracks: number;

  setScanning: (scanning: boolean) => void;
  setProgress: (progress: number) => void;
  setTotalTracks: (total: number) => void;
  setTracks: (tracks: RawTrack[]) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  tracks: [],
  isScanning: false,
  scanProgress: 0,
  totalTracks: 0,

  setScanning: (isScanning) => set({ isScanning }),
  setProgress: (scanProgress) => set({ scanProgress }),
  setTotalTracks: (totalTracks) => set({ totalTracks }),
  setTracks: (tracks) => set({ tracks }),
}));