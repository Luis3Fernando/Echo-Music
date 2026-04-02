import { useCallback, useState, useMemo } from "react";
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
import ScreenHeader from "@components/organisms/ScreenHeader";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import { ConfirmDialog } from "@components/organisms/ConfirmDialog";
import SongListControls from "../../library/components/SongListControls";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { usePlaylists, useAddTracksToPlaylist } from "@hooks/use-playlists.hook";
import { AddToPlaylistModal } from "@components/organisms/AddToPlaylistModal";
import { useAppSettings } from "@hooks/use-app-settings.hook";
import { TRACK_SORT_OPTIONS } from "@constants/sort-options.constants";
import { usePlayerActions } from "@/presentation/shared/hooks/use-player-actions.hook";
import { usePlayerStore } from "@store/use-player.store";

export const SongsScreen = () => {
  const { songs } = useLibrary();
  const { config, updateSetting } = useAppSettings();
  const navigation = useNavigation<any>();
  const { playList } = usePlayerActions();

  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [sortMenuAnchor, setSortMenuAnchor] = useState({ x: 0, y: 0 });

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isTrackMenuVisible, setIsTrackMenuVisible] = useState(false);
  const [trackMenuAnchor, setTrackMenuAnchor] = useState({ x: 0, y: 0 });
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const { userPlaylists, refreshPlaylists } = usePlaylists();
  const { addTracks } = useAddTracksToPlaylist();

  const handlePlaySongs = (shuffle: boolean) => {
    if (songs.length === 0) return;
    const ids = songs.map(s => s.id);
    playList(ids, 0, shuffle);
  };

  const handleTrackPress = (track: Track) => {
    if (songs.length === 0) return;
    const ids = songs.map(s => s.id);
    const index = songs.findIndex(s => s.id === track.id);
    const isShuffleActive = usePlayerStore.getState().queue?.isShuffle ?? false;
    playList(ids, index, isShuffleActive);
  };

  const sortOptions: MenuItem[] = useMemo(() => 
    TRACK_SORT_OPTIONS.map((option) => ({
      label: option.label,
      icon: option.icon,
      onPress: () => {
        updateSetting("trackSortOrder", option.label);
        setIsSortMenuVisible(false);
      },
    })), [updateSetting]
  );

  const trackOptions: MenuItem[] = useMemo(() => [
    {
      label: "Reproducir",
      icon: "play-outline",
      onPress: () => {
        setIsTrackMenuVisible(false);
        if (selectedTrack) handleTrackPress(selectedTrack);
      },
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
      onPress: () => {
        if (!selectedTrack) return;
        setIsTrackMenuVisible(false);
        navigation.navigate("Artist", {
          artistId: selectedTrack.artistId,
          name: selectedTrack.artistName,
        });
      },
    },
    {
      label: "Ir al álbum",
      icon: "disc-outline",
      onPress: () => {
        if (!selectedTrack || !selectedTrack.albumId) return;
        setIsTrackMenuVisible(false);
        navigation.navigate("Album", {
          id: selectedTrack.albumId,
          albumName: selectedTrack.albumName,
          artistName: selectedTrack.artistName,
          artwork: selectedTrack.artworkUri || undefined,
        });
      },
    },
    {
      label: "Eliminar",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => {
        setIsTrackMenuVisible(false);
        setIsConfirmVisible(true);
      },
    },
  ], [selectedTrack, songs]);

  const handleSelectPlaylist = async (playlist: any) => {
    if (!selectedTrack) return;
    setIsAddModalVisible(false);
    const success = await addTracks(playlist.id, [selectedTrack.id]);
    if (success) refreshPlaylists();
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
            orderLabel={config.trackSortOrder}
            onOrderPress={(event: any) => {
              const { pageX, pageY } = event.nativeEvent;
              setSortMenuAnchor({ x: pageX, y: pageY });
              setIsSortMenuVisible(true);
            }}
            onShufflePress={() => handlePlaySongs(true)}
            onPlayAllPress={() => handlePlaySongs(false)}
          />
        }
        renderItem={({ item, index }) => (
          <SongItem
            track={item}
            index={index}
            showIndex={false}
            showFavorite={false}
            onPress={handleTrackPress}
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
        title="Eliminar canción"
        description="¿Deseas eliminar permanentemente?"
        confirmLabel="Eliminar"
        isDestructive={true}
        onConfirm={() => setIsConfirmVisible(false)}
        onCancel={() => setIsConfirmVisible(false)}
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