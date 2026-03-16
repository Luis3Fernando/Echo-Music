import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FullPlayerHeader from "../components/FullPlayerHeader";
import PlayerSection from "../components/PlayerSection";
import LyricsSection from "../components/LyricsSection";

interface FullPlayerProps {
  onClose: () => void;
  animatedStyle?: any;
}

const FullPlayer = ({ onClose, animatedStyle }: FullPlayerProps) => {
  const [activeTab, setActiveTab] = useState<"player" | "lyrics">("player");

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <FullPlayerHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
      />
      <View style={styles.content}>
        {activeTab === "player" ? (
          <Animated.View
            key="player"
            entering={FadeIn}
            exiting={FadeOut}
            style={{ flex: 1 }}
          >
            <PlayerSection />
          </Animated.View>
        ) : (
          <Animated.View
            key="lyrics"
            entering={FadeIn}
            exiting={FadeOut}
            style={{ flex: 1 }}
          >
            <LyricsSection />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF", paddingTop: 10 },
  content: { flex: 1, paddingHorizontal: 30 },
});

export default FullPlayer;
