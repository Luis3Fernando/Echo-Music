import { ArtistRepository } from "@interfaces/artist.repository";
import { Artist } from "@entities/artist.entity";
import { generateUUID } from "@utils/uuid";

export class ArtistManager {
  constructor(private artistRepo: ArtistRepository) {}

  async getOrCreate(name: string): Promise<Artist> {
    const cleanName = name.trim();
    
    const existingArtist = await this.artistRepo.findByName(cleanName);
    if (existingArtist) {
      return existingArtist;
    }

    const newArtist: Artist = {
      id: generateUUID(),
      name: cleanName,
      pictureUrl: "", 
      description: null,
      socialLinks: [],
      reels: [],
      isProcessed: false,
    };

    await this.artistRepo.save(newArtist);
    
    return newArtist;
  }

  async getOrCreateMany(names: string[]): Promise<Artist[]> {
    const artists: Artist[] = [];
    for (const name of names) {
      const artist = await this.getOrCreate(name);
      artists.push(artist);
    }
    return artists;
  }
}