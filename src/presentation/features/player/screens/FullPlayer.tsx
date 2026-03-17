import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
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
        contentContainerStyle={styles.scrollContainer}
      >
        <FullPlayerHeader 
          onClose={onClose} 
          isFavorite={isFavorite}
          onToggleFavorite={() => setIsFavorite(!isFavorite)}
        />
        <View style={styles.mainPlayerWrapper}>
          <PlayerSection />
        </View>
        <View style={styles.lyricsWrapper}>
          <DetailsSection />
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
  scrollContainer: {
    paddingBottom: 60,
    paddingTop: 10
  },
  mainPlayerWrapper: {
    height: SCREEN_HEIGHT * 0.8, 
    justifyContent: "flex-start",
  },
  lyricsWrapper: {
    paddingHorizontal: 20,
  },
});

export default FullPlayer;