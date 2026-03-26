export interface Album {
  readonly id: string;
  title: string;
  artistId: string;
  artistName: string;
  artworkUri?: string | null;
  year?: number | null;
  genre?: string | null;
  trackCount: number;
}