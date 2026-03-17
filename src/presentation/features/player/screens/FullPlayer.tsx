import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

import FullPlayerHeader from "../components/FullPlayerHeader";
import PlayerSection from "../components/PlayerSection";
import DetailsSection from "../components/DetailsSection";

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
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LinearGradient
          colors={["#ffffff", "#e1e1e1", "#4d4d4d", "#161616"]}
          locations={[0, 0.4, 0.6, 1]}
          style={styles.gradientBackground}
        >
          <FullPlayerHeader
            onClose={onClose}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
          />
          <View style={styles.mainPlayerWrapper}>
            <PlayerSection />
          </View>
          <View style={styles.detailsWrapper}>
            <DetailsSection />
          </View>
        </LinearGradient>
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPlayerContent: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradientBackground: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 60,
  },
  mainPlayerWrapper: {
    height: SCREEN_HEIGHT * 0.82,
    justifyContent: "flex-start",
  },
  detailsWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default FullPlayer;
