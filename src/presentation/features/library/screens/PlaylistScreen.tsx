import { useMemo, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  SafeAreaView,
  Animated,
  FlatList,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { LibraryStackParamList } from "@navigation/LibraryNavigator";
import { USER_PLAYLISTS, SYSTEM_PLAYLISTS } from "@mocks/mock-playlists";
import { useImageAccentColor } from "@hooks/use-image-accent-color";
import { ScreenHeaderBasic } from "@components/molecules/ScreenHeaderBasic";
import { MOCK_SONGS } from "@mocks/mock-songs";
import SongListControls from "../components/SongListControls";
import SongItem from "@components/atoms/SongItem";

type PlaylistScreenRouteProp = RouteProp<LibraryStackParamList, "Playlist">;

const PlaylistScreen = () => {
  const route = useRoute<PlaylistScreenRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const playlist = useMemo(() => {
    const allPlaylists = [...USER_PLAYLISTS, ...SYSTEM_PLAYLISTS];
    return allPlaylists.find((p) => p.id === id);
  }, [id]);

  const { main, dark } = useImageAccentColor(
    playlist?.artworkUri,
    Colors.gray_dark,
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (main !== Colors.gray_dark) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [main]);

  if (!playlist) return null;

  return (
    <View style={[styles.container, { backgroundColor: Colors.gray_dark }]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: dark, opacity: fadeAnim },
        ]}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenHeaderBasic
          title="Playlist"
          showBack={true}
          showOptions={true}
          onBackPress={() => navigation.goBack()}
          onOptionsPress={() => console.log("Opciones de playlist")}
          variant="dark"
        />
        <View style={styles.topSection}>
          <View style={styles.imageColumn}>
            <View style={[styles.shadowWrapper, { shadowColor: main }]}>
              <Image
                source={
                  playlist.artworkUri
                    ? { uri: playlist.artworkUri }
                    : require("@assets/img/album_default.png")
                }
                style={styles.coverImage}
              />
            </View>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.playlistName} numberOfLines={2}>
              {playlist.name}
            </Text>
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>48 canciones</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>2h 15m</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <FlatList
            data={MOCK_SONGS}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<SongListControls />}
            renderItem={({ item }) => (
              <SongItem
                track={item as any}
                showIndex={false}
                showFavorite={true}
                isFavorite={item.id === "1"}
                onPress={(t) => console.log("Reproduciendo:", t.title)}
                onFavoritePress={(t) =>
                  console.log("Toggle favorito:", t.title)
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  topSection: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 20,
    alignItems: "center",
    columnGap: 25,
  },
  imageColumn: { flex: 0.45 },
  shadowWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 18,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  infoColumn: { flex: 0.55, justifyContent: "center" },
  playlistName: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.white,
    marginBottom: 10,
  },
  tagContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  tagText: { color: "#EEE", fontSize: 12, fontWeight: "600" },
  bottomSection: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 10,
    paddingTop: 5, 
    overflow: "hidden",
    paddingBottom: 100,
  },
});

export default PlaylistScreen;
