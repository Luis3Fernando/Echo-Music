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
const TAB_BAR_HEIGHT = 50;

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
  if (!isVisible) return { display: 'none' };

  const radiusValue = interpolate(expandProgress.value, [0, 1], [25, 0], Extrapolation.CLAMP);

  return {
    display: 'flex',
    height: interpolate(expandProgress.value, [0, 1], [75, SCREEN_HEIGHT], Extrapolation.CLAMP),
    bottom: interpolate(expandProgress.value, [0, 1], [TAB_BAR_HEIGHT, 0], Extrapolation.CLAMP),
    left: 0, 
    right: 0,
    borderTopLeftRadius: radiusValue,
    borderTopRightRadius: radiusValue,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#FFFFFF",
  };
});

  const miniOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(expandProgress.value, [0, 0.1], [1, 0], Extrapolation.CLAMP),
  }));

  const fullOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(expandProgress.value, [0.2, 0.5], [0, 1], Extrapolation.CLAMP),
  }));

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const val = -e.translationY / (SCREEN_HEIGHT - 100);
      expandProgress.value = Math.max(0, Math.min(1, val));
    })
    .onEnd((e) => {
      if (e.velocityY < -500 || expandProgress.value > 0.5)
        expandProgress.value = withSpring(1, { damping: 15 });
      else expandProgress.value = withSpring(0, { damping: 15 });
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, containerStyle]}>
        <MiniPlayer animatedStyle={miniOpacity} />
        <FullPlayer 
          animatedStyle={fullOpacity} 
          pointerEvents={expandProgress.value > 0.5 ? "auto" : "none"} 
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 999,
  },
});