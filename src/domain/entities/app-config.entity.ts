export interface AppConfig {
  isFirstLaunch: boolean;
  shuffleAlways: boolean;
  crossfadeDuration: number;
  defaultTrackSort: string;
  defaultPlaylistSort: string;
  theme: 'light' | 'dark' | 'system';
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  isFirstLaunch: false,
  shuffleAlways: false,
  crossfadeDuration: 0,
  defaultTrackSort: "Por nombre (A-Z)",
  defaultPlaylistSort: "Por nombre (A-Z)",
  theme: 'system'
};