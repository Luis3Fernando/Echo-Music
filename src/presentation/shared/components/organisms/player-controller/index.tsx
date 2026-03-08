import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { navigationRef } from "@navigation/navigation-ref";
import MiniPlayer from "./MiniPlayer";
import FullPlayer from "./FullPlayer";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MINI_HEIGHT = 75;
const TAB_BAR_HEIGHT = 70;
const FLOAT_BOTTOM = 85;

export const PlayerController = () => {
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const expandProgress = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const initialRoute = navigationRef.getCurrentRoute()?.name;
      if (initialRoute) setCurrentRoute(initialRoute);
    }, 200);

    const unsubscribe = navigationRef.addListener("state", () => {
      const routeName = navigationRef.getCurrentRoute()?.name;
      if (routeName) setCurrentRoute(routeName);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const isVisible = currentRoute !== "" && currentRoute !== "Onboarding";

  const containerStyle = useAnimatedStyle(() => {
    if (!isVisible) return { display: "none" };

    return {
      display: "flex",
      height: interpolate(
        expandProgress.value,
        [0, 1],
        [MINI_HEIGHT, SCREEN_HEIGHT],
        Extrapolation.CLAMP,
      ),
      bottom: interpolate(
        expandProgress.value,
        [0, 1],
        [FLOAT_BOTTOM, 0],
        Extrapolation.CLAMP,
      ),
      left: interpolate(
        expandProgress.value,
        [0, 1],
        [10, 0],
        Extrapolation.CLAMP,
      ),
      right: interpolate(
        expandProgress.value,
        [0, 1],
        [10, 0],
        Extrapolation.CLAMP,
      ),
      borderRadius: interpolate(expandProgress.value, [0, 1], [20, 0]),
    };
  });

  const miniPlayerOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      expandProgress.value,
      [0, 0.15],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const fullPlayerOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      expandProgress.value,
      [0.3, 0.6],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      const newValue = -event.translationY / (SCREEN_HEIGHT - 100);
      expandProgress.value = Math.max(0, Math.min(1, newValue));
    })
    .onEnd((event) => {
      if (event.velocityY < -500 || expandProgress.value > 0.5)
        expandProgress.value = withSpring(1, { damping: 15 });
      else expandProgress.value = withSpring(0, { damping: 15 });
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, containerStyle]}>
        <MiniPlayer animatedStyle={miniPlayerOpacity} />

        <FullPlayer
          animatedStyle={fullPlayerOpacity}
          pointerEvents={expandProgress.value > 0.5 ? "auto" : "none"}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
