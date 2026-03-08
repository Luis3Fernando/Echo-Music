import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { navigationRef } from "@navigation/navigation-ref";
import MiniPlayer from "./MiniPlayer";
import FullPlayer from "./FullPlayer";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MINI_PLAYER_HEIGHT = 70;

export const PlayerController = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const animatedIndex = useSharedValue(0);

  useEffect(() => {
    const initial = navigationRef.getCurrentRoute()?.name;
    if (initial) setCurrentRoute(initial);
    const unsubscribe = navigationRef.addListener("state", () => {
      const routeName = navigationRef.getCurrentRoute()?.name;
      if (routeName) setCurrentRoute(routeName);
    });
    return unsubscribe;
  }, []);

  const isVisible = currentRoute !== "" && currentRoute !== "Onboarding";

  const expandPlayer = useCallback(() => bottomSheetRef.current?.expand(), []);
  const closePlayer = useCallback(() => bottomSheetRef.current?.collapse(), []);

  if (!isVisible) return null;

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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={[70, "100%"]}
      animatedIndex={animatedIndex}
      handleComponent={null}
      backgroundStyle={{ backgroundColor: "#FFF" }}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <Animated.View style={miniPlayerStyle}>
          <MiniPlayer onExpand={expandPlayer} animatedStyle={{ opacity: 1 }} />
        </Animated.View>
        <View style={{ flex: 1 }}>
          <FullPlayer
            onClose={closePlayer}
            animatedStyle={{ opacity: 1 }}
            pointerEvents={animatedIndex.value > 0.1 ? "auto" : "none"}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
