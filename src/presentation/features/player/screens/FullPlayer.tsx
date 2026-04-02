import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, BackHandler } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import FullPlayerHeader from "../components/FullPlayerHeader";
import PlayerSection from "../components/PlayerSection";
import DetailsSection from "../components/DetailsSection";
import { Colors } from "@/core/theme/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FullPlayerProps {
  animatedStyle?: any;
  onClose: () => void;
}

const FullPlayer = ({ animatedStyle, onClose }: FullPlayerProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const backAction = () => {
      onClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [onClose]);

  return (
    <View style={[styles.fullPlayerContent, animatedStyle]}>
      <BottomSheetScrollView
        key="full-player-scroll"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.staticBackground}>
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
        </View>
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPlayerContent: {
    flex: 1,
    backgroundColor: "#000",
  },
  staticBackground: {
    flex: 1,
    backgroundColor: Colors.background_dark,
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