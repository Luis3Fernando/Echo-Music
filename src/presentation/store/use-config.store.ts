import { create } from 'zustand';
import { AppConfig, DEFAULT_APP_CONFIG } from '@entities/app-config.entity';

interface AppConfigState {
  config: AppConfig;
  isLoading: boolean;
  setFullConfig: (config: AppConfig) => void;
  updateConfigKey: (key: keyof AppConfig, value: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppConfigStore = create<AppConfigState>((set) => ({
  config: DEFAULT_APP_CONFIG,
  isLoading: true,

  setFullConfig: (config) => set({ config, isLoading: false }),

  updateConfigKey: (key, value) => 
    set((state) => ({
      config: { ...state.config, [key]: value }
    })),

  setLoading: (loading) => set({ isLoading: loading }),
}));