import { create } from 'zustand';
import { PlaybackQueue } from '@entities/queue.entity';
import { Track } from '@entities/track.entity';
import { RepeatMode, getNextRepeatMode } from '@value-objects/repeat-mode.object';

interface PlayerState {
  queue: PlaybackQueue | null;
  currentTrack: Track | null;
  queueArtworks: Record<string, string | null>;
  isPlaying: boolean;
  setQueue: (queue: PlaybackQueue) => void;
  setQueueArtworks: (artworks: Record<string, string | null>) => void;
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (playing: boolean) => void;
  toggleShuffle: () => void;
  nextRepeatMode: () => void;
  updateIndex: (index: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  queue: null,
  currentTrack: null,
  queueArtworks: {},
  isPlaying: false,

  setQueue: (queue) => set({ queue }),

  setQueueArtworks: (artworks) => set({ queueArtworks: artworks }),
  
  setCurrentTrack: (track) => set({ currentTrack: track }),
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  updateIndex: (index) => set((state) => ({
    queue: state.queue ? { ...state.queue, currentIndex: index } : null
  })),

  toggleShuffle: () => set((state) => ({
    queue: state.queue ? { ...state.queue, isShuffle: !state.queue.isShuffle } : null
  })),

  nextRepeatMode: () => set((state) => ({
    queue: state.queue ? { 
      ...state.queue, 
      repeatMode: getNextRepeatMode(state.queue.repeatMode) 
    } : null
  })),
}));