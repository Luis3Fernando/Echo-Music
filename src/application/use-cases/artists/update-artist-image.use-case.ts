import { ArtistRepository } from "@interfaces/artist.repository";

export class UpdateArtistImageUseCase {
  constructor(private artistRepo: ArtistRepository) {}

  async execute(artistId: string, imageUri: string): Promise<string> {
    const artist = await this.artistRepo.findById(artistId);
    
    if (!artist) {
      throw new Error("Artista no encontrado");
    }
    
    artist.pictureUrl = imageUri;

    await this.artistRepo.save(artist);

    return imageUri;
  }
}