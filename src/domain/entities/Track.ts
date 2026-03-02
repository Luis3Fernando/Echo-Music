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
  genre?: string;  
  year?: number;  
  trackNumber?: number;   
  artworkUri?: string | null;  
  isProcessed: boolean;  
  dateAdded: number;         
  lastPlayed?: number;  
}