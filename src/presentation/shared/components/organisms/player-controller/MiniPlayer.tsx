import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { MOCK_TRACK } from "@mocks/mock-track";

interface MiniPlayerProps {
  animatedStyle: any;
  onExpand?: () => void;
}

const MiniPlayer = ({ animatedStyle, onExpand }: MiniPlayerProps) => {
  const track = MOCK_TRACK;
  const handlePrevious = () => console.log("Evento: Canción Anterior");
  const handlePlayPause = () => console.log("Evento: Play/Pause");
  const handleNext = () => console.log("Evento: Siguiente Canción");

  return (
    <TouchableOpacity onPress={onExpand} activeOpacity={1}>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <Image
          source={{ uri: track.artworkUri || undefined }}
          style={styles.artwork}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track.artistName}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={handlePrevious} activeOpacity={0.6}>
            <Ionicons name="play-back-sharp" size={22} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePlayPause}
            style={styles.playBtnPrimary}
            activeOpacity={0.8}
          >
            <Ionicons name="play-sharp" size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} activeOpacity={0.6}>
            <Ionicons name="play-forward-sharp" size={22} color="#1A1A1A" />
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
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
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
    gap: 18,
  },
  playBtnPrimary: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default MiniPlayer;
