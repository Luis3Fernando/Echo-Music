import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Playlist } from "@/domain/entities/playlist.entity";

interface PlaylistPromoProps {
  playlist: Playlist;
}

const PlaylistPromoSection = ({ playlist }: PlaylistPromoProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.imageColumn}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Playlist", {
            playlistId: playlist.id,
            playlistName: playlist.name,
          });
        }}
      >
        <Image
          source={
            playlist.artworkUri
              ? { uri: playlist.artworkUri }
              : require("@assets/img/album_default.png")
          }
          style={styles.coverImage}
        />
      </TouchableOpacity>
      
      <View style={styles.infoColumn}>
        <View style={styles.bottomContent}>
          <View style={styles.textWrapper}>
            <Text style={styles.playlistTitle} numberOfLines={2}>
              {playlist.name}
            </Text>
            <Text style={styles.playlistStats}>
              48 canciones • 2h 15m
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PlaylistForm")}
            >
              <Ionicons name="add-circle" size={20} color={Colors.white} />
              <Text style={styles.btnText}>Crear</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryBtn} 
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Playlist", {
                  playlistId: playlist.id,
                  playlistName: playlist.name,
                });
              }}
            >
              <Ionicons name="play" size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    columnGap: 30,
  },
  imageColumn: {
    flex: 0.4,
  },
  coverImage: {
    width: 150,
    borderRadius: 12,
    height: 140,
    backgroundColor: "#F0F0F0",
  },
  infoColumn: {
    flex: 0.6,
  },
  bottomContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
  textWrapper: {
    marginBottom: 12,
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.black,
    lineHeight: 24,
    marginBottom: 4,
  },
  playlistStats: {
    fontSize: 13,
    color: Colors.gray_text,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  secondaryBtn: {
    backgroundColor: Colors.muted,
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 14,
  },
});

export default PlaylistPromoSection;