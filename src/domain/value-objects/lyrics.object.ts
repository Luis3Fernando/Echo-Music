export enum LyricsType {
  PLAIN = 'plain',
  SYNCED = 'synced',
  NONE = 'none',
}

export enum LyricsSource {
  EMBEDDED = 'embedded',
  EXTERNAL_FILE = 'external_file',
  API = 'api',
}

export interface Lyrics {
  content: string;
  type: LyricsType;
  source: LyricsSource;
}