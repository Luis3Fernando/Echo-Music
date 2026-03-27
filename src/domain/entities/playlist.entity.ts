export interface Playlist {
  readonly id: string;
  name: string;
  artworkUri?: string | null;  
  isUserCreated: boolean;
  trackCount: number;
  createdAt: number;
  updatedAt: number;
}