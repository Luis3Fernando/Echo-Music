import TrackPlayer, { Capability, AppKilledPlaybackBehavior, RepeatMode } from 'react-native-track-player';
import { IPlayerService } from "@interfaces-services/player.service";
import { Track } from "@entities/track.entity";

export class TrackPlayerService implements IPlayerService {
  async setup(): Promise<void> {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
    });
  }

  async play(track: Track): Promise<void> {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: track.id,
      url: track.url,
      title: track.title,
      artist: track.artistName,
      artwork: track.artworkUri || undefined,
      duration: track.duration / 1000,
    });
    await TrackPlayer.play();
  }

  async pause(): Promise<void> {
    await TrackPlayer.pause();
  }

  async resume(): Promise<void> {
    await TrackPlayer.play();
  }

  async seekTo(position: number): Promise<void> {
    await TrackPlayer.seekTo(position);
  }

  async stop(): Promise<void> {
    await TrackPlayer.stop();
  }

  async setQueue(tracks: Track[], startIndex: number): Promise<void> {
    const playlist = tracks.map(t => ({
      id: t.id,
      url: t.url,
      title: t.title,
      artist: t.artistName,
      artwork: t.artworkUri || undefined,
      duration: t.duration / 1000,
    }));
    await TrackPlayer.reset();
    await TrackPlayer.add(playlist);
    await TrackPlayer.skip(startIndex);
    await TrackPlayer.play();
  }

  async skipToNext(): Promise<void> {
    await TrackPlayer.skipToNext();
  }

  async skipToPrevious(): Promise<void> {
    await TrackPlayer.skipToPrevious();
  }
}