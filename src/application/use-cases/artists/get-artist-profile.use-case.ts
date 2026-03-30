import { ArtistRepository } from "@interfaces/artist.repository";
import { TrackRepository } from "@interfaces/track.repository";
import { AlbumRepository } from "@interfaces/album.repository";
import { Artist } from "@entities/artist.entity";
import { Track } from "@entities/track.entity";
import { Album } from "@entities/album.entity";
import { GetOrCreateArtistUseCase } from "./get-or-create-artist.use-case";

export interface ArtistProfile {
  artist: Artist;
  tracks: Track[];
  albums: Album[];
  collaborators: Artist[];
}

export class GetArtistProfileUseCase {
  constructor(
    private getOrCreateArtist: GetOrCreateArtistUseCase,
    private trackRepo: TrackRepository,
    private albumRepo: AlbumRepository,
    private artistRepo: ArtistRepository
  ) {}

  async execute(artistName: string): Promise<ArtistProfile> {
    console.log("\n====================================");
    console.log(`[DEBUG-PROFILE] INICIANDO PERFIL: "${artistName}"`);

    const artist = await this.getOrCreateArtist.execute(artistName);
    console.log(`[DEBUG-PROFILE] ARTISTA FINAL A USAR -> Nombre: "${artist.name}" | ID: "${artist.id}"`);

    const allTracks = await this.trackRepo.findAll();
    console.log(`\n[DEBUG-PROFILE] --- VOLCADO TOTAL DE CANCIONES (${allTracks.length}) ---`);
    allTracks.forEach((t, i) => {
      console.log(`  ${i + 1}. Título: "${t.title}"`);
      console.log(`     -> artistName BD: "${t.artistName}"`);
      console.log(`     -> artistId BD: "${t.artistId}"`);
      console.log(`     -> artistIds (Array):`, t.artistIds);
    });
    console.log("--------------------------------------------------\n");

    const [tracks, albums] = await Promise.all([
      this.trackRepo.findByArtistId(artist.id, artist.name),
      this.albumRepo.findByArtistId(artist.id, artist.name),
    ]);

    console.log(`[DEBUG-PROFILE] RESULTADO MATCH: Canciones: ${tracks.length} | Álbumes: ${albums.length}`);

    const collaboratorIdsSet = new Set<string>();
    tracks.forEach((track) => {
      track.artistIds.forEach((id) => {
        if (id !== artist.id) collaboratorIdsSet.add(id);
      });
    });

    const collaboratorIds = Array.from(collaboratorIdsSet);
    
    const collaborators = collaboratorIds.length > 0 
      ? await this.artistRepo.findByIds(collaboratorIds)
      : [];

    console.log("====================================\n");

    return {
      artist,
      tracks,
      albums,
      collaborators,
    };
  }
}