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
  year?: number | null;
  size: number;
  artworkUri?: string | null;
  lyrics?: Lyrics | null; 
  isFavorite: boolean; 
  isProcessed: boolean;
  dateAdded: number;
  playCount: number;  
}