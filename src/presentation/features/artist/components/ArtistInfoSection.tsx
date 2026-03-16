import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";

interface ArtistInfoSectionProps {
  name: string;
  songCount: number;
  duration: string;
  onPlayPress: () => void;
  onShufflePress: () => void;
}

const ArtistInfoSection = ({
  name,
  songCount,
  duration,
  onPlayPress,
  onShufflePress,
}: ArtistInfoSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.artistName} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="musical-note" size={14} color="#888" />
            <Text style={styles.metaText}>{songCount} canciones</Text>
          </View>
          <View style={styles.dot} />
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#888" />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.shuffleButton}
          onPress={onShufflePress}
          activeOpacity={0.7}
        >
          <Ionicons name="shuffle" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playButton}
          onPress={onPlayPress}
          activeOpacity={0.8}
        >
          <Ionicons name="play" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  artistName: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    letterSpacing: -0.8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 27,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    paddingLeft: 3,
  },
  shuffleButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ArtistInfoSection;
