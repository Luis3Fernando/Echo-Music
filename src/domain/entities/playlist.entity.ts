export interface Playlist {
  readonly id: string;
  name: string;
  artworkUri?: string | null;  
  isUserCreated: boolean;
  createdAt: number;
  updatedAt: number;
}