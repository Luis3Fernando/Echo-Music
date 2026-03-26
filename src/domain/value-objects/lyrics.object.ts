export type LyricsType = 'plain' | 'synced' | 'none';

export interface Lyrics {
  content: string;
  type: LyricsType;
  source: 'embedded' | 'external_file' | 'api';
}