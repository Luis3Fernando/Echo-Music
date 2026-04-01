export interface AppConfig {
  isFirstLaunch: boolean;
  shuffleAlways: boolean;
  crossfadeDuration: number;
  trackSortOrder: string; 
  playlistSortOrder: string;
  theme: 'light' | 'dark' | 'system';
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  isFirstLaunch: false,
  shuffleAlways: false,
  crossfadeDuration: 0,
  trackSortOrder: "Por nombre (A-Z)",
  playlistSortOrder: "Por nombre (A-Z)",
  theme: 'system'
};