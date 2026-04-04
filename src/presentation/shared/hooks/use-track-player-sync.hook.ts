import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from "react-native-track-player";
import { usePlayerStore } from "@store/use-player.store";
import { usePlayerActions } from "@hooks/use-player-actions.hook";

export const useTrackPlayerSync = () => {
  const { updateIndex } = usePlayerStore();
  const { loadTrackMetadata } = usePlayerActions();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.index !== undefined
    ) {
      console.log("[Sync] El motor cambió al track índice:", event.index);
      updateIndex(event.index);
      await loadTrackMetadata(event.index);
    }
  });
};
