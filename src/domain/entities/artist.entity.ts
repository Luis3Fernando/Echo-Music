export interface Artist {
  id: string;
  name: string;
  pictureUrl: string;
  description?: string | null;
  socialLinks?: string[] | null;
  reels?: string[] | null; 
  isProcessed: boolean;
}