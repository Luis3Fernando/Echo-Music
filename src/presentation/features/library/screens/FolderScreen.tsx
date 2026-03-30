import { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { Track } from "@entities/track.entity";
import { ScreenHeaderBasic } from "@components/molecules/ScreenHeaderBasic";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import { ConfirmDialog } from "@components/organisms/ConfirmDialog";
import FolderHeaderSection from "../components/FolderHeaderSection";
import SongListControls from "../components/SongListControls";
import SongItem from "@components/atoms/SongItem";
import { formatPlaylistDuration } from "@utils/time";
import {
  usePlaylists,
  useAddTracksToPlaylist,
} from "@hooks/use-playlists.hook";
import { AddToPlaylistModal } from "@components/organisms/AddToPlaylistModal";
import { useFolderDetail } from "@hooks/use-folders.hook";
import { useHardwareBack } from "@hooks/use-hardware-back.hook";
import { useTrack } from "@hooks/use-track.hook";

const FolderScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { folderId, folderName } = route.params || {};

  const { tracks, isLoading, refresh } = useFolderDetail(folderId);
  const { userPlaylists, refreshPlaylists } = usePlaylists();
  const { addTracks } = useAddTracksToPlaylist();
  const { toggleFavorite } = useTrack();

  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [sortMenuAnchor, setSortMenuAnchor] = useState({ x: 0, y: 0 });
  const [currentSort, setCurrentSort] = useState("Por nombre");

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isTrackMenuVisible, setIsTrackMenuVisible] = useState(false);
  const [trackMenuAnchor, setTrackMenuAnchor] = useState({ x: 0, y: 0 });
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });

  useHardwareBack(() => {
    if (isTrackMenuVisible || isSortMenuVisible) {
      setIsTrackMenuVisible(false);
      setIsSortMenuVisible(false);
      return true;
    }

    return false;
  });

  const totalDuration = useMemo(() => {
    const totalMs = tracks.reduce((acc, track) => acc + track.duration, 0);
    return formatPlaylistDuration(totalMs);
  }, [tracks]);

  const sortOptions: MenuItem[] = [
    {
      label: "Por nombre (A-Z)",
      icon: "text-outline",
      onPress: () => setCurrentSort("Por nombre"),
    },
    {
      label: "Por artista",
      icon: "person-outline",
      onPress: () => setCurrentSort("Por artista"),
    },
    {
      label: "Más recientes",
      icon: "time-outline",
      onPress: () => setCurrentSort("Recientes"),
    },
  ];

  const trackOptions: MenuItem[] = useMemo(
    () => [
      {
        label: "Reproducir",
        icon: "play-outline",
        onPress: () => console.log("Play", selectedTrack?.title),
      },
      {
        label: "Añadir a playlist",
        icon: "add-circle-outline",
        onPress: () => {
          setIsTrackMenuVisible(false);
          setIsAddModalVisible(true);
        },
      },
      {
        label: "Eliminar",
        icon: "trash-outline",
        variant: "danger",
        onPress: () => {
          setConfirmData({
            title: "Eliminar canción",
            description: `¿Deseas eliminar permanentemente de tu memoria interna?`,
            onConfirm: () => {
              console.log("LOG: Eliminación física pendiente");
              setIsConfirmVisible(false);
            },
          });
          setIsConfirmVisible(true);
          setIsTrackMenuVisible(false);
        },
      },
    ],
    [selectedTrack],
  );

  useFocusEffect(
    useCallback(() => {
      refreshPlaylists();
    }, [refreshPlaylists]),
  );

  if (isLoading && tracks.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  const handleSelectPlaylist = async (playlist: any) => {
    if (!selectedTrack) return;
    setIsAddModalVisible(false);
    const success = await addTracks(playlist.id, [selectedTrack.id]);
    if (success) {
      refreshPlaylists();
    }
  };

  const handleToggleFavorite = async (track: Track) => {
    const newState = await toggleFavorite(track.id);

    if (newState !== null) {
      refresh();
      refreshPlaylists();
    }
  };
  return (
    <View style={styles.container}>
      <ScreenHeaderBasic
        title={folderName}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        variant="light"
      />
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <FolderHeaderSection
              name={folderName}
              path={folderId}
              trackCount={tracks.length}
              duration={totalDuration}
            />
            <SongListControls
              orderLabel={currentSort}
              onOrderPress={(event) => {
                const { pageX, pageY } = event.nativeEvent;
                setSortMenuAnchor({ x: pageX, y: pageY });
                setIsSortMenuVisible(true);
              }}
              onShufflePress={() => console.log("Shuffle folder")}
              onPlayAllPress={() => console.log("Play folder")}
            />
          </>
        }
        renderItem={({ item }) => (
          <SongItem
            track={item}
            showIndex={false}
            showFavorite={true}
            showArtist={true}
            showOptions={true}
            onPress={(t) => console.log("Reproduciendo:", t.title)}
            onFavoritePress={() => handleToggleFavorite(item)}
            onOptionsPress={(event, track) => {
              const { pageX, pageY } = event.nativeEvent;
              setTrackMenuAnchor({ x: pageX, y: pageY });
              setSelectedTrack(track);
              setIsTrackMenuVisible(true);
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <MenuPopover
        isVisible={isSortMenuVisible}
        onClose={() => setIsSortMenuVisible(false)}
        items={sortOptions}
        anchorPosition={sortMenuAnchor}
      />
      <MenuPopover
        isVisible={isTrackMenuVisible}
        onClose={() => setIsTrackMenuVisible(false)}
        items={trackOptions}
        anchorPosition={trackMenuAnchor}
      />
      <ConfirmDialog
        isVisible={isConfirmVisible}
        title={confirmData.title}
        description={confirmData.description}
        confirmLabel="Eliminar"
        onConfirm={confirmData.onConfirm}
        onCancel={() => setIsConfirmVisible(false)}
        isDestructive={true}
      />
      <AddToPlaylistModal
        isVisible={isAddModalVisible}
        playlists={userPlaylists}
        onClose={() => setIsAddModalVisible(false)}
        onSelect={handleSelectPlaylist}
        onCreateNew={() => {
          setIsAddModalVisible(false);
          navigation.navigate("PlaylistForm");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "android" ? 25 : 10,
  },
  listContent: {
    paddingBottom: 120,
  },
});

export default FolderScreen;
