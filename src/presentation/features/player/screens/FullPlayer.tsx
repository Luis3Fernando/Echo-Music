import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import FullPlayerHeader from "../components/FullPlayerHeader";
import PlayerSection from "../components/PlayerSection";
import LyricsSection from "../components/LyricsSection";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FullPlayerProps {
  animatedStyle?: any;
  onClose: () => void;
}

const FullPlayer = ({ animatedStyle, onClose }: FullPlayerProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View style={[styles.fullPlayerContent, animatedStyle]}>
      <BottomSheetScrollView 
        key="full-player-scroll"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* EL HEADER MODULARIZADO */}
        <FullPlayerHeader 
          onClose={onClose} 
          isFavorite={isFavorite}
          onToggleFavorite={() => setIsFavorite(!isFavorite)}
        />

        {/* SECCIÓN 1: REPRODUCTOR */}
        <View style={styles.mainPlayerWrapper}>
          <PlayerSection />
        </View>

        {/* SECCIÓN 2: LETRAS */}
        <View style={styles.lyricsWrapper}>
          <LyricsSection />
        </View>
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPlayerContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  dragIndicatorContainer: {
    paddingTop: 12,
    alignItems: "center",
    width: '100%',
  },
  indicator: {
    width: 36,
    height: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
  },
  scrollContainer: {
    paddingBottom: 60,
    paddingTop: 10
  },
  mainPlayerWrapper: {
    // Altura calculada para que el reproductor ocupe casi toda la pantalla inicial
    height: SCREEN_HEIGHT * 0.8, 
    justifyContent: "flex-start",
  },
  lyricsWrapper: {
    paddingHorizontal: 30,
    marginTop: 20,
    minHeight: 400,
  },
});

export default FullPlayer;