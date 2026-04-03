import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { Colors } from "@/core/theme/colors";

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const PlayerProgressBar = () => {
  const { position, duration } = useProgress(250);

  const trackWidth = useSharedValue(0);
  const progress = useSharedValue(0);
  const isDragging = useSharedValue(false);

  useEffect(() => {
    if (!isDragging.value && duration > 0) {
      progress.value = position / duration;
    }
  }, [position, duration]);

  const handleSeekEnd = async (sliderValue: number) => {
    if (duration > 0) {
      const seekPosition = sliderValue * duration;
      await TrackPlayer.seekTo(seekPosition);
    }
  };

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onBegin((event) => {
      isDragging.value = true;
      if (trackWidth.value > 0) {
        progress.value = Math.max(0, Math.min(event.x / trackWidth.value, 1));
      }
    })
    .onUpdate((event) => {
      if (trackWidth.value > 0) {
        progress.value = Math.max(0, Math.min(event.x / trackWidth.value, 1));
      }
    })
    .onEnd(() => {
      runOnJS(handleSeekEnd)(progress.value);
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  const animatedFilledStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const animatedHeadStyle = useAnimatedStyle(() => ({
    left: `${progress.value * 100}%`,
    transform: [{ scale: withSpring(isDragging.value ? 1.4 : 1) }],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View
          style={styles.barArea}
          onLayout={(e) => {
            trackWidth.value = e.nativeEvent.layout.width;
          }}
        >
          <View style={styles.backgroundBar}>
            <Animated.View style={[styles.filledBar, animatedFilledStyle]} />
            <Animated.View style={[styles.snakeHead, animatedHeadStyle]} />
          </View>
        </View>
      </GestureDetector>
      
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>
          {formatTime(isDragging.value ? progress.value * duration : position)}
        </Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginTop: 10, paddingHorizontal: 35 },
  barArea: { height: 40, justifyContent: "center", width: "100%" },
  backgroundBar: {
    height: 4,
    width: "100%",
    backgroundColor: "#696969",
    borderRadius: 2,
    position: "relative",
  },
  filledBar: {
    height: "100%",
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  snakeHead: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.white,
    top: -5,
    marginLeft: -7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  timeText: { fontSize: 12, color: "#A0A0A0", fontWeight: "600" },
});

export default PlayerProgressBar;