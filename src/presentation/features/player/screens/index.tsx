import { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
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
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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

  const expandPlayer = useCallback(() => bottomSheetRef.current?.expand(), []);
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

  const animatedContainerStyle = useAnimatedStyle(() => ({
    zIndex: animatedIndex.value > 0.01 ? 9999 : 1,
  }));

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
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      enablePanDownToClose={false}
      
      // SOLUCIÓN GESTOS: 
      // Aumentamos la zona de "fallo" del gesto vertical del BottomSheet
      // para que el ScrollView interno tenga prioridad al deslizar arriba.
      activeOffsetY={[-5, 5]} 
      failOffsetX={[-5, 5]}
      
      style={animatedContainerStyle}
    >
      {/* IMPORTANTE: Usamos un View con un Z-Index alto y 
         StyleSheet.absoluteFill para que el contenido no se 
         "pierda" por el absolute de la TabBar.
      */}
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
