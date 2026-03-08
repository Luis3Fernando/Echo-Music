import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { MOCK_TRACK } from "@mocks/mock-track";

interface MiniPlayerProps {
  animatedStyle: any;
}

const MiniPlayer = ({ animatedStyle }: MiniPlayerProps) => {
  const track = MOCK_TRACK;

  return (
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
        <TouchableOpacity style={styles.playBtn} activeOpacity={0.7}>
          <Ionicons name="play" size={20} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="play-forward" size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
    letterSpacing: 0.2,
  },
  artist: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MiniPlayer;
