import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

interface Props {
  currentTime: string;
  duration: string;
}

const PlayerProgressBar = ({ currentTime, duration }: Props) => {
  const [width, setWidth] = useState(0);
  const progress = useSharedValue(0.45);
  const isDragging = useSharedValue(false);

  const handleSeekEnd = (value: number) => {
    console.log(`Usuario soltó en: ${Math.round(value * 100)}%`);
  };

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      isDragging.value = true;
      const newValue = Math.max(0, Math.min(event.x / width, 1));
      progress.value = newValue;
    })
    .onUpdate((event) => {
      const newValue = Math.max(0, Math.min(event.x / width, 1));
      progress.value = newValue;
    })
    .onEnd(() => {
      isDragging.value = false;
      runOnJS(handleSeekEnd)(progress.value);
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
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          <View style={styles.backgroundBar}>
            <Animated.View style={[styles.filledBar, animatedFilledStyle]} />
            <Animated.View style={[styles.snakeHead, animatedHeadStyle]} />
          </View>
        </View>
      </GestureDetector>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{currentTime}</Text>
        <Text style={styles.timeText}>{duration}</Text>
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
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
    position: "relative",
  },
  filledBar: {
    height: "100%",
    backgroundColor: "#1A1A1A",
    borderRadius: 2,
  },
  snakeHead: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#1A1A1A",
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
