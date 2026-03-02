export interface RawTrack {
  id: string;   
  url: string; 
  title: string | null;    
  artist: string | null; 
  album: string | null;  
  genre: string | null; 
  year: number | null;  
  duration: number;
  fileName: string;     
  fileSize: number;   
  format: string;    
  bitrate: number | null;
  artworkUri: string | null;
  dateAdded: number;
}