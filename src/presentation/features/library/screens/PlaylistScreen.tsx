import { useMemo, useState, useCallback } from "react";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  LayoutAnimation,
} from "react-native";
import {
  useRoute,
  useNavigation,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { LibraryStackParamList } from "@navigation/LibraryNavigator";
import { ScreenHeaderBasic } from "@components/molecules/ScreenHeaderBasic";
import { Track } from "@entities/track.entity";
import { ConfirmDialog } from "@components/organisms/ConfirmDialog";
import SongListControls from "../components/SongListControls";
import SongItem from "@components/atoms/SongItem";
import { usePlaylistDetail } from "@hooks/use-playlists.hook";
import { formatPlaylistDuration } from "@utils/time";
import PlaylistEmptyState from "../components/PlaylistEmptyState";
import { useHardwareBack } from "@hooks/use-hardware-back.hook";
import {
  useDeletePlaylist,
  useRemoveTrackFromPlaylist,
} from "@hooks/use-playlists.hook";
import { useTrack } from "@hooks/use-track.hook";
import { useAppSettings } from "@hooks/use-app-settings.hook";
import { TRACK_SORT_OPTIONS } from "@constants/sort-options.constants";
import { usePlayerActions } from "@hooks/use-player-actions.hook";
import { usePlayerStore } from "@store/use-player.store";

type PlaylistScreenRouteProp = RouteProp<LibraryStackParamList, "Playlist">;

const PlaylistScreen = () => {
  const route = useRoute<PlaylistScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { id } = route.params;
  const { playlist, tracks, setTracks, isLoading, refresh } =
    usePlaylistDetail(id);
  const { playList } = usePlayerActions();
  const updateTrackInStore = usePlayerStore((s) => s.updateTrackInStore);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isTrackMenuVisible, setIsTrackMenuVisible] = useState(false);
  const [trackMenuAnchor, setTrackMenuAnchor] = useState({ x: 0, y: 0 });
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [sortMenuAnchor, setSortMenuAnchor] = useState({ x: 0, y: 0 });
  const { config, updateSetting } = useAppSettings();
  const { deletePlaylist } = useDeletePlaylist();
  const { removeTrack } = useRemoveTrackFromPlaylist();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { toggleFavorite } = useTrack();
  const [confirmData, setConfirmData] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });

  useHardwareBack(() => {
    if (isMenuVisible || isTrackMenuVisible || isSortMenuVisible) {
      setIsMenuVisible(false);
      setIsTrackMenuVisible(false);
      setIsSortMenuVisible(false);
      return true;
    }

    return false;
  });

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const playlistOptions: MenuItem[] = useMemo(() => {
    if (!playlist) return [];

    return [
      {
        label: "Editar playlist",
        icon: "pencil",
        onPress: () => navigation.navigate("PlaylistForm", { playlist }),
      },
      {
        label: "Eliminar",
        icon: "trash-outline",
        variant: "danger",
        onPress: () => {
          setConfirmData({
            title: "Eliminar playlist",
            description: `¿Estás seguro de que quieres borrar "${playlist.name}"?`,
            onConfirm: async () => {
              const success = await deletePlaylist(playlist.id);
              if (success) {
                setIsConfirmVisible(false);
                navigation.goBack();
              }
            },
          });
          setIsConfirmVisible(true);
        },
      },
    ];
  }, [playlist, navigation, deletePlaylist]);

  const trackOptions: MenuItem[] = useMemo(() => {
    const options: MenuItem[] = [
      {
        label: "Reproducir",
        icon: "play-outline",
        onPress: () => console.log("Play", selectedTrack?.title),
      },
      {
        label: "Añadir a la cola",
        icon: "list-outline",
        onPress: () => console.log("A cola"),
      },
    ];

    if (playlist?.isUserCreated) {
      options.push({
        label: "Quitar de esta playlist",
        icon: "remove-circle-outline",
        onPress: async () => {
          if (!selectedTrack) return;
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

          const success = await removeTrack(playlist.id, selectedTrack.id);
          if (success) {
            setIsTrackMenuVisible(false);
            refresh();
          }
        },
      });
    }

    options.push({
      label: "Eliminar",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => {
        setConfirmData({
          title: "Eliminar canción",
          description: `¿Deseas eliminar permanentemente de tu memoria interna?`,
          onConfirm: () => {
            console.log("LOG: Canción eliminada físicamente");
            setIsConfirmVisible(false);
          },
        });
        setIsConfirmVisible(true);
        setIsTrackMenuVisible(false);
      },
    });

    return options;
  }, [playlist, selectedTrack]);

  const sortOptions: MenuItem[] = useMemo(
    () =>
      TRACK_SORT_OPTIONS.map((option) => ({
        label: option.label,
        icon: option.icon,
        onPress: () => {
          updateSetting("playlistSortOrder", option.label);
          setIsSortMenuVisible(false);
        },
      })),
    [updateSetting],
  );

  const totalDuration = tracks.reduce((acc, track) => acc + track.duration, 0);

  if (isLoading && !playlist) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (!playlist) return null;

  const handleToggleFavorite = async (track: Track) => {
    const newStatus = !track.isFavorite;
    if (playlist.id === "playlist-favorites" && track.isFavorite) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    if (setTracks) {
      setTracks(
        tracks.map((t) =>
          t.id === track.id ? { ...t, isFavorite: newStatus } : t,
        ),
      );
    }

    updateTrackInStore(track.id, { isFavorite: newStatus });

    try {
      await toggleFavorite(track.id);
    } catch (e) {
      refresh();
    }
  };

  const handlePlayPlaylist = (shuffle: boolean) => {
    if (tracks.length === 0) return;
    const ids = tracks.map((t) => t.id);
    playList(ids, 0, shuffle);
  };

  const handleTrackPress = (track: Track) => {
    const ids = tracks.map((t) => t.id);
    const index = tracks.findIndex((t) => t.id === track.id);
    const isCurrentlyShuffling =
      usePlayerStore.getState().queue?.isShuffle ?? false;
    playList(ids, index, isCurrentlyShuffling);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#F9F9F8" }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreenHeaderBasic
          title="Playlist"
          showBack={true}
          showOptions={playlist.isUserCreated}
          onBackPress={() => navigation.goBack()}
          onOptionsPress={(event) => {
            const { pageX, pageY } = event.nativeEvent;
            setMenuAnchor({ x: pageX, y: pageY });
            setIsMenuVisible(true);
          }}
          variant="light"
        />
        <View style={styles.topSection}>
          <View style={styles.imageColumn}>
            <View style={[styles.shadowWrapper, { shadowColor: "#4A4A48" }]}>
              <Image
                source={
                  playlist.artworkUri
                    ? { uri: playlist.artworkUri }
                    : require("@assets/img/playlist_default.png")
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
                <Text style={styles.tagText}>
                  {playlist.trackCount} canciones
                </Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {formatPlaylistDuration(totalDuration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <FlatList
            data={tracks}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              tracks.length > 0 ? (
                <SongListControls
                  orderLabel={config.playlistSortOrder}
                  onOrderPress={(event) => {
                    const { pageX, pageY } = event.nativeEvent;
                    setSortMenuAnchor({ x: pageX, y: pageY });
                    setIsSortMenuVisible(true);
                  }}
                  onShufflePress={() => handlePlayPlaylist(true)}
                  onPlayAllPress={() => handlePlayPlaylist(false)}
                />
              ) : null
            }
            ListEmptyComponent={<PlaylistEmptyState />}
            renderItem={({ item }) => (
              <SongItem
                track={item as any}
                showIndex={false}
                showFavorite={true}
                onPress={handleTrackPress}
                onFavoritePress={() => handleToggleFavorite(item as any)}
                onOptionsPress={(event, track) => {
                  const { pageX, pageY } = event.nativeEvent;
                  setTrackMenuAnchor({ x: pageX, y: pageY });
                  setSelectedTrack(track);
                  setIsTrackMenuVisible(true);
                }}
              />
            )}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </SafeAreaView>
      <MenuPopover
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        items={playlistOptions}
        anchorPosition={menuAnchor}
      />
      <MenuPopover
        isVisible={isTrackMenuVisible}
        onClose={() => setIsTrackMenuVisible(false)}
        items={trackOptions}
        anchorPosition={trackMenuAnchor}
      />
      <MenuPopover
        isVisible={isSortMenuVisible}
        onClose={() => setIsSortMenuVisible(false)}
        items={sortOptions}
        anchorPosition={sortMenuAnchor}
      />
      <ConfirmDialog
        isVisible={isConfirmVisible}
        title={confirmData.title}
        description={confirmData.description}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        isDestructive={true}
        onConfirm={confirmData.onConfirm}
        onCancel={() => setIsConfirmVisible(false)}
      />
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
  infoColumn: {
    flex: 0.55,
    justifyContent: "center",
    paddingLeft: 5,
  },
  playlistName: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.black,
    marginBottom: 6,
    lineHeight: 26,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 6,
    columnGap: 8,
    alignItems: "center",
  },
  tag: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  tagText: { color: Colors.black, fontSize: 12, fontWeight: "600" },
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
