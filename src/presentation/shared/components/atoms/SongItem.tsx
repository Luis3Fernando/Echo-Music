import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Track } from "@/domain/entities/track.entity";
import { Colors } from "@theme/colors";
import { boolean } from "yup";

interface SongItemProps {
  track: Track;
  index?: number;
  showIndex?: boolean;
  showArtwork?: boolean;
  showArtist?: boolean;
  showFavorite?: boolean;
  showOptions?: boolean;
  isFavorite?: boolean;
  titleVariant?: "default" | "light";
  onPress?: (track: Track) => void;
  onFavoritePress?: (track: Track) => void;
  onOptionsPress?: (event: GestureResponderEvent, track: Track) => void;
}

const SongItem = ({
  track,
  index,
  showIndex = false,
  showArtwork = true,
  showArtist = true,
  showFavorite = true,
  showOptions = true,
  isFavorite = false,
  titleVariant = "default",
  onPress,
  onFavoritePress,
  onOptionsPress,
}: SongItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(track)}
      activeOpacity={0.7}
    >
      {showIndex && index !== undefined && (
        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>{index + 1}</Text>
        </View>
      )}
      {showArtwork && (
        <View style={styles.artworkContainer}>
          {track.artworkUri ? (
            <Image source={{ uri: track.artworkUri }} style={styles.artwork} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons
                name="musical-notes"
                size={20}
                color={Colors.gray_light}
              />
            </View>
          )}
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text 
          style={[
            styles.title, 
            titleVariant === "light" && styles.titleLight
          ]} 
          numberOfLines={1}
        >
          {track.title}
        </Text>
        {showArtist && (
          <Text style={styles.artist} numberOfLines={1}>
            {track.artistName}
          </Text>
        )}
      </View>
      <View style={styles.actionsContainer}>
        {showFavorite && (
          <TouchableOpacity
            onPress={() => onFavoritePress?.(track)}
            style={styles.actionButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? Colors.primary : "#b3b3b3"}
            />
          </TouchableOpacity>
        )}
        {showOptions && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(event) => onOptionsPress?.(event, track)}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="#b3b3b3" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  indexContainer: {
    width: 30,
    marginRight: 4,
    alignItems: "center",
  },
  indexText: {
    color: "#b3b3b3",
    fontSize: 14,
    fontWeight: "400",
  },
  artworkContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  artwork: {
    width: 52,
    height: 52,
    borderRadius: 6,
  },
  placeholder: {
    width: 52,
    height: 52,
    borderRadius: 6,
    backgroundColor: "#EAE7EE",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  title: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  titleLight: {
    color: "#000000", 
    fontWeight: "400",
  },
  artist: {
    color: "#b3b3b3",
    fontSize: 13,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default SongItem;
