import { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from "react-native-track-player";
import { navigationRef } from "@navigation/navigation-ref";
import MiniPlayer from "./MiniPlayer";
import FullPlayer from "./FullPlayer";
import { usePlayerStore } from "@store/use-player.store";
import { TrackProgressTracker } from "../components/TrackProgressTracker";
import { useTrackPlayerSync } from "@hooks/use-track-player-sync.hook";
import { SqliteTrackRepository } from "@/infrastructure/repositories/sqlite-track.repository";
import { useSQLiteContext } from "expo-sqlite";

const MINI_PLAYER_HEIGHT = 70;

export const PlayerController = () => {
  useTrackPlayerSync();
  const db = useSQLiteContext();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const animatedIndex = useSharedValue(0);
  const [gesturesEnabled, setGesturesEnabled] = useState(false);
  
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.index != null) {

      const store = usePlayerStore.getState();
      const freshQueue = store.queue;

      if (!freshQueue) return;
      store.updateIndex(event.index);

      const targetId = freshQueue.isShuffle
        ? freshQueue.shuffledTracks[event.index]
        : freshQueue.tracks[event.index];
      const trackRepo = new SqliteTrackRepository(db);
      const newTrackData = await trackRepo.findById(targetId);

      if (newTrackData) {
        store.setCurrentTrack(newTrackData);
      }
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGesturesEnabled(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const expandPlayer = useCallback(() => {
    setGesturesEnabled(false);
    setTimeout(() => {
      setGesturesEnabled(true);
      bottomSheetRef.current?.expand();
    }, 10);
  }, []);

  useEffect(() => {
    const initial = navigationRef.getCurrentRoute()?.name;
    if (initial) setCurrentRoute(initial);
    const unsubscribe = navigationRef.addListener("state", () => {
      const routeName = navigationRef.getCurrentRoute()?.name;
      if (routeName) setCurrentRoute(routeName);
    });
    return unsubscribe;
  }, []);

  const closePlayer = useCallback(() => bottomSheetRef.current?.collapse(), []);

  const miniPlayerStyle = useAnimatedStyle(() => {
    const isHidden = animatedIndex.value > 0.05;
    return {
      opacity: interpolate(
        animatedIndex.value,
        [0, 0.05],
        [1, 0],
        Extrapolation.CLAMP,
      ),
      height: interpolate(
        animatedIndex.value,
        [0, 0.1],
        [MINI_PLAYER_HEIGHT, 0],
        Extrapolation.CLAMP,
      ),
      display: isHidden ? "none" : "flex",
    };
  });

  const isVisible = currentRoute !== "" && currentRoute !== "Onboarding";
  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={[MINI_PLAYER_HEIGHT, "100%"]}
      animatedIndex={animatedIndex}
      handleComponent={null}
      backgroundStyle={{ backgroundColor: "#FFF" }}
      enableContentPanningGesture={gesturesEnabled}
      enableHandlePanningGesture={true}
      enablePanDownToClose={false}
    >
      <View style={{ flex: 1 }}>
        <TrackProgressTracker />
        <Animated.View style={miniPlayerStyle}>
          <MiniPlayer onExpand={expandPlayer} animatedStyle={{ opacity: 1 }} />
        </Animated.View>
        <View style={{ flex: 1 }}>
          <FullPlayer onClose={closePlayer} animatedStyle={{ opacity: 1 }} />
        </View>
      </View>
    </BottomSheet>
  );
};
