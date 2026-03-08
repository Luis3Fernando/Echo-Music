import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FullPlayerProps {
  animatedStyle?: any;
  pointerEvents: "auto" | "none";
  onClose: () => void;
}

const FullPlayer = ({
  animatedStyle,
  pointerEvents,
  onClose,
}: FullPlayerProps) => {
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
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator} />
        </View>
        <View style={styles.mainContent}>
          <View style={styles.bigArt} />

          <View style={styles.infoContainer}>
            <Text style={styles.fullTitle} numberOfLines={1}>
              Nombre de la Canción
            </Text>
            <Text style={styles.fullArtist} numberOfLines={1}>
              Artista de la Pista
            </Text>
          </View>
          <View style={styles.controlsWrapper}>
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>0:00</Text>
                <Text style={styles.timeText}>3:45</Text>
              </View>
            </View>
            <View style={styles.playbackControls}>
              <View style={styles.sideControl} />
              <View style={styles.playButton} />
              <View style={styles.sideControl} />
            </View>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fullPlayerContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  indicatorContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 32,
  },
  bigArt: {
    width: SCREEN_HEIGHT * 0.38,
    height: SCREEN_HEIGHT * 0.38,
    borderRadius: 28,
    backgroundColor: "#F8F9FA",
    marginTop: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  infoContainer: {
    width: "100%",
    marginTop: 40,
    alignItems: "center",
  },
  fullTitle: {
    color: "#1A1A1A",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  fullArtist: {
    color: "#707070",
    fontSize: 18,
    marginTop: 6,
    textAlign: "center",
  },
  controlsWrapper: {
    width: "100%",
    marginTop: 40,
  },
  progressSection: {
    width: "100%",
    marginBottom: 30,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
  },
  progressFill: {
    width: "30%",
    height: "100%",
    backgroundColor: "#1A1A1A",
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#A0A0A0",
    fontWeight: "500",
  },
  playbackControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  sideControl: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#F8F9FA",
  },
  playButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#1A1A1A",
  },
});

export default FullPlayer;
