import { Track } from "@entities/track.entity";
import { Artist } from "@entities/artist.entity";
import { Album } from "@entities/album.entity";

export interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}