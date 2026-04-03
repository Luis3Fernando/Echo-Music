import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '@theme/colors';
import { usePlaybackState, State } from 'react-native-track-player';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
}

const PlayerControls = ({ onNext, onPrev, onPlayPause }: Props) => {
  const playbackState = usePlaybackState();
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);

  const isPlaying = playbackState.state === State.Playing;
  const isBuffering = playbackState.state === State.Buffering || playbackState.state === State.Loading;

  return (
    <View style={styles.playbackControls}>
      <TouchableOpacity 
        onPress={() => {
          setIsShuffleActive(!isShuffleActive);
          console.log("Shuffle:", !isShuffleActive);
        }}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="shuffle-outline" 
          size={24} 
          color={isShuffleActive ? Colors.secondary : "#A0A0A0"} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPrev}>
        <Ionicons name="play-skip-back-outline" size={32} color="#dfdfdf" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={onPlayPause}
        activeOpacity={0.9}
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
      <TouchableOpacity onPress={onNext}>
        <Ionicons name="play-skip-forward-outline" size={32} color="#dfdfdf" />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => {
          setIsRepeatActive(!isRepeatActive);
          console.log("Repeat:", !isRepeatActive);
        }}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="repeat-outline" 
          size={24} 
          color={isRepeatActive ? Colors.secondary : "#A0A0A0"} 
        />
      </TouchableOpacity>
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