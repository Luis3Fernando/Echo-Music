import { Lyrics } from "../value-objects/lyrics.object";

export interface Track {
  readonly id: string;
  readonly url: string;
  title: string;
  artistId: string;
  albumId?: string;
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
  lyrics?: Lyrics | null;
  isFavorite: boolean;
  isProcessed: boolean;
  dateAdded: number;
  playCount: number;
}
