import { Colors } from "@theme/colors";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

interface PlaylistItemProps {
  name: string;
  artworkUri?: string | null;
  onPress: () => void;
}

const PlaylistItem = ({ name, artworkUri, onPress }: PlaylistItemProps) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
      <Image 
        source={artworkUri ? { uri: artworkUri } : require("@assets/img/album_default.png")} 
        style={styles.coverImage} 
      />
      <Text style={styles.playlistName} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 140, 
    marginRight: 15,
  },
  coverImage: {
    width: 140,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  playlistName: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 18,
    paddingHorizontal: 2,
  },
});

export default PlaylistItem;