import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '@/core/theme/colors';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const PlayerControls = ({ onNext, onPrev }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);

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
          color={isShuffleActive ? "#1A1A1A" : "#A0A0A0"} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPrev}>
        <Ionicons name="play-skip-back-outline" size={32} color="#1A1A1A" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={() => setIsPlaying(!isPlaying)}
        activeOpacity={0.9}
      >
        <Ionicons 
          name={isPlaying ? "pause" : "play"} 
          size={38} 
          color="#FFF" 
          style={{ marginLeft: isPlaying ? 0 : 4 }} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Ionicons name="play-skip-forward-outline" size={32} color="#1A1A1A" />
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
          color={isRepeatActive ? "#1A1A1A" : "#A0A0A0"} 
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
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default PlayerControls;