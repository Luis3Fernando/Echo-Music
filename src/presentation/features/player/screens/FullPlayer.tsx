import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import FullPlayerHeader from "../components/FullPlayerHeader";
import PlayerSection from "../components/PlayerSection";
import LyricsSection from "../components/LyricsSection";

interface FullPlayerProps {
  animatedStyle?: any;
  pointerEvents: "auto" | "none";
  onClose: () => void;
}

const FullPlayer = ({ animatedStyle, pointerEvents, onClose }: FullPlayerProps) => {
  const [activeTab, setActiveTab] = useState<"player" | "lyrics">("player");

  const swipeGesture = Gesture.Pan()
    .activeOffsetY(10)
    .onUpdate((event) => {
      if (event.translationY > 80) {
        onClose();
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View
        style={[styles.fullPlayerContent, animatedStyle]}
        pointerEvents={pointerEvents}
      >
        <FullPlayerHeader
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onClose={onClose} 
        />
        {activeTab === "player" ? (
          <Animated.View 
            key="player-section" 
            entering={FadeIn.duration(300)} 
            exiting={FadeOut.duration(200)} 
            style={styles.flex1}
          >
            <PlayerSection />
          </Animated.View>
        ) : (
          <Animated.View 
            key="lyrics-section" 
            entering={FadeIn.duration(300)} 
            exiting={FadeOut.duration(200)} 
            style={styles.flex1}
          >
            <LyricsSection/>
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  fullPlayerContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex1: {
    flex: 1,
  },
});

export default FullPlayer;