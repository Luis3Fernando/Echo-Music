export interface Album {
  readonly id: string;
  title: string;
  artistId: string;
  artistIds: string[]; 
  artistName: string;
  artworkUri?: string | null;
  year?: number | null;
  trackCount: number;
  playCount: number;
}