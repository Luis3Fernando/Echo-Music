import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlaybackState, State } from "react-native-track-player";
import { usePlayerStore } from "@/presentation/store/use-player.store";

interface Props {
  onNext: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
}

const PlayerControls = ({ onNext, onPrev, onPlayPause }: Props) => {
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const playbackState = usePlaybackState();
  const isBuffering =
    playbackState.state === State.Buffering ||
    playbackState.state === State.Loading;

  return (
    <View style={styles.playbackControls}>
      {/* <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="shuffle-outline" size={24} color="#A0A0A0" />
      </TouchableOpacity> 
      */}
      <View style={{ width: 24 }} />
      <TouchableOpacity onPress={onPrev} activeOpacity={0.7}>
        <Ionicons name="play-skip-back-outline" size={32} color="#dfdfdf" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.playButton}
        onPress={onPlayPause}
        activeOpacity={0.8}
        disabled={isBuffering}
      >
        {isBuffering ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={38}
            color="#000"
            style={{ marginLeft: isPlaying ? 0 : 4 }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} activeOpacity={0.7}>
        <Ionicons name="play-skip-forward-outline" size={32} color="#dfdfdf" />
      </TouchableOpacity>
      {/* <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="repeat-outline" size={24} color="#A0A0A0" />
      </TouchableOpacity> 
      */}
      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  playbackControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 35,
  },
  playButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#e7e7e7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#1A1A1A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default PlayerControls;
