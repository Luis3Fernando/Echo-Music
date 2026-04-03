import TrackPlayer, { Event } from "react-native-track-player";

export const PlaybackService = async () => {
  TrackPlayer.addEventListener('remote-play' as Event, () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause' as Event, () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-next' as Event, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener('remote-previous' as Event, () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener('remote-stop' as Event, () => TrackPlayer.stop());

  TrackPlayer.addEventListener('remote-duck' as Event, async (event: any) => {
    if (event.permanent) {
      await TrackPlayer.stop();
    } else if (event.paused) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  });
};