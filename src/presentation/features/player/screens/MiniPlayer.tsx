import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { usePlayerStore } from "@store/use-player.store";
import { usePlayerActions } from "@hooks/use-player-actions.hook";
import { usePlaybackState, State } from "react-native-track-player";

interface MiniPlayerProps {
  animatedStyle: any;
  onExpand?: () => void;
}

const MiniPlayer = ({ animatedStyle, onExpand }: MiniPlayerProps) => {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const { skipToNext, skipToPrevious, togglePlayPause } = usePlayerActions();
  const { state: playerState } = usePlaybackState();
  const isPlaying = playerState === State.Playing;
  const isBuffering =
    playerState === State.Buffering || playerState === State.Loading;

  if (!currentTrack) return null;

  return (
    <TouchableOpacity onPress={onExpand} activeOpacity={1}>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <Image
          source={
            currentTrack.artworkUri
              ? { uri: currentTrack.artworkUri }
              : require("@assets/img/song_default.png")
          }
          style={styles.artwork}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artistName}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={skipToPrevious} activeOpacity={0.6}>
            <FontAwesome6 name="backward" size={18} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={togglePlayPause}
            style={styles.playBtnPrimary}
            activeOpacity={0.8}
            disabled={isBuffering}
          >
            {isBuffering ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Ionicons
                name={isPlaying ? "pause-outline" : "play-outline"}
                size={22}
                color={Colors.white}
                style={{ marginLeft: isPlaying ? 0 : 2 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext} activeOpacity={0.6}>
            <FontAwesome6 name="forward" size={18} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.2,
  },
  artist: {
    fontSize: 12,
    color: "#707070",
    marginTop: 1,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },
  playBtnPrimary: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default MiniPlayer;
