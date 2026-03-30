import { TrackRepository } from "@interfaces/track.repository";
import { PlaylistRepository } from "@interfaces/playlist.repository";
import { SYSTEM_PLAYLISTS } from "@constants/system-playlists.constant";

export class ToggleFavoriteUseCase {
  private readonly FAVORITES_ID = SYSTEM_PLAYLISTS.FAVORITES;

  constructor(
    private trackRepo: TrackRepository,
    private playlistRepo: PlaylistRepository
  ) {}

  async execute(trackId: string): Promise<boolean> {
    const track = await this.trackRepo.findById(trackId);
    if (!track) throw new Error("Canción no encontrada");

    const newIsFavorite = !track.isFavorite;
    await this.trackRepo.updateMetadata(trackId, { isFavorite: newIsFavorite });

    if (newIsFavorite) {
      await this.playlistRepo.addTracks(this.FAVORITES_ID, [trackId]);
      if (track.artworkUri) {
        await this.playlistRepo.updateArtwork(this.FAVORITES_ID, track.artworkUri);
      }
    } else {
      await this.playlistRepo.removeTrackFromPlaylist(this.FAVORITES_ID, trackId);
      const latestArtwork = await this.playlistRepo.getLatestTrackArtwork(this.FAVORITES_ID);
      await this.playlistRepo.updateArtwork(this.FAVORITES_ID, latestArtwork);
    }

    return newIsFavorite;
  }
}