import { useCallback, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { useLibrary } from "@hooks/use-library.hook";
import { Track } from "@entities/track.entity";
import { Colors } from "@theme/colors";
import SongItem from "@components/atoms/SongItem";
import ScreenHeader from "@/presentation/shared/components/organisms/ScreenHeader";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import { ConfirmDialog } from "@components/organisms/ConfirmDialog";
import SongListControls from "../../library/components/SongListControls";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  usePlaylists,
  useAddTracksToPlaylist,
} from "@hooks/use-playlists.hook";
import { AddToPlaylistModal } from "@components/organisms/AddToPlaylistModal";

export const SongsScreen = () => {
  const { songs, isScanning } = useLibrary();
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [sortMenuAnchor, setSortMenuAnchor] = useState({ x: 0, y: 0 });
  const [currentSort, setCurrentSort] = useState("Por nombre");

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isTrackMenuVisible, setIsTrackMenuVisible] = useState(false);
  const [trackMenuAnchor, setTrackMenuAnchor] = useState({ x: 0, y: 0 });
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const navigation = useNavigation<any>();
  const { userPlaylists, refreshPlaylists } = usePlaylists();
  const { addTracks } = useAddTracksToPlaylist();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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
      label: "Añadidas recientemente",
      icon: "time-outline",
      onPress: () => setCurrentSort("Recientes"),
    },
  ];

  const trackOptions: MenuItem[] = [
    {
      label: "Reproducir",
      icon: "play-outline",
      onPress: () => console.log("Play", selectedTrack?.title),
    },
    {
      label: "Añadir a la cola",
      icon: "list-outline",
      onPress: () => console.log("Queue"),
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
      label: "Ir al artista",
      icon: "person-circle-outline",
      onPress: () => console.log("Ver artista"),
    },
    {
      label: "Ir al álbum",
      icon: "disc-outline",
      onPress: () => console.log("Ver álbum"),
    },
    {
      label: "Eliminar canción",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => setIsConfirmVisible(true),
    },
  ];

  const handleSelectPlaylist = async (playlist: any) => {
    if (!selectedTrack) return;
    setIsAddModalVisible(false);
    const success = await addTracks(playlist.id, [selectedTrack.id]);
    if (success) {
      refreshPlaylists();
    }
  };

  const handleCreateNewPlaylist = () => {
    setIsAddModalVisible(false);
    navigation.navigate("PlaylistForm");
  };

  useFocusEffect(
    useCallback(() => {
      refreshPlaylists();
    }, [refreshPlaylists]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScreenHeader title="Canciones" showAction={false} />
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SongListControls
            orderLabel={currentSort}
            onOrderPress={(event: any) => {
              const { pageX, pageY } = event.nativeEvent;
              setSortMenuAnchor({ x: pageX, y: pageY });
              setIsSortMenuVisible(true);
            }}
            onShufflePress={() => console.log("Shuffle total")}
            onPlayAllPress={() => console.log("Reproducir todas")}
          />
        }
        renderItem={({ item, index }) => (
          <SongItem
            track={item}
            index={index}
            showIndex={false}
            showFavorite={true}
            onPress={(t) => console.log("Play", t.title)}
            onOptionsPress={(event, track) => {
              const { pageX, pageY } = event.nativeEvent;
              setTrackMenuAnchor({ x: pageX, y: pageY });
              setSelectedTrack(track);
              setIsTrackMenuVisible(true);
            }}
          />
        )}
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
        title="¿Eliminar canción?"
        description={`¿Estás seguro de que quieres eliminar "${selectedTrack?.title}" permanentemente de tu dispositivo?`}
        confirmLabel="Eliminar"
        isDestructive={true}
        onConfirm={() => {
          console.log("Eliminando track...");
          setIsConfirmVisible(false);
        }}
        onCancel={() => setIsConfirmVisible(false)}
      />
      <AddToPlaylistModal
        isVisible={isAddModalVisible}
        playlists={userPlaylists}
        onClose={() => setIsAddModalVisible(false)}
        onSelect={handleSelectPlaylist}
        onCreateNew={handleCreateNewPlaylist}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  listContent: {
    paddingBottom: 120,
  },
});

export default SongsScreen;
