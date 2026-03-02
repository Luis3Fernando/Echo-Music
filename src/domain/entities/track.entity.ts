export interface Track {
  readonly id: string;
  readonly url: string;
  title: string;
  artistName: string;
  albumName: string;
  duration: number;
  format: string;
  bitrate?: number;
  size: number;
  genre?: string | null;
  year?: number | null;
  trackNumber?: number | null;
  diskNumber?: number | null;
  artworkUri?: string | null;
  isProcessed: boolean;
  dateAdded: number;
}
