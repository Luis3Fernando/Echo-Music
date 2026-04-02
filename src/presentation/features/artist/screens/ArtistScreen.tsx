import { useState, useMemo, useCallback } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "@theme/colors";
import { Track } from "@entities/track.entity";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import { useArtistProfile } from "@hooks/use-artist-profile.hook";
import { formatPlaylistDuration } from "@utils/time";
import {
  usePlaylists,
  useAddTracksToPlaylist,
} from "@hooks/use-playlists.hook";
import { useTrack } from "@hooks/use-track.hook";
import { useHardwareBack } from "@hooks/use-hardware-back.hook";
import { AddToPlaylistModal } from "@components/organisms/AddToPlaylistModal";
import { ConfirmDialog } from "@components/organisms/ConfirmDialog";
import ArtistHeaderSection from "../components/ArtistHeaderSection";
import ArtistInfoSection from "../components/ArtistInfoSection";
import ArtistSongsSection from "../components/ArtistSongsSection";
import ArtistAlbumsSection from "../components/ArtistAlbumsSection";
import ArtistCollaborationsSection from "../components/ArtistCollaborationsSection";
import { useArtist } from "@hooks/use-artist.hook";
import { usePlayerActions } from "@hooks/use-player-actions.hook";
import { usePlayerStore } from "@store/use-player.store";

const ArtistScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { name } = route.params;
  const {
    artist,
    tracks,
    setTracks,
    albums,
    collaborators,
    isLoading,
    refresh,
  } = useArtistProfile(name);

  const { userPlaylists, refreshPlaylists } = usePlaylists();
  const { addTracks } = useAddTracksToPlaylist();
  const { toggleFavorite } = useTrack();
  const { updateImage } = useArtist();
  const { playList } = usePlayerActions();
  const updateTrackInStore = usePlayerStore((s) => s.updateTrackInStore);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const handlePlayArtist = (shuffle: boolean) => {
    if (!tracks || tracks.length === 0) return;
    const ids = tracks.map((t) => t.id);
    playList(ids, 0, shuffle);
  };

  const handleTrackPress = (track: Track) => {
    if (!tracks) return;
    const ids = tracks.map((t) => t.id);
    const index = tracks.findIndex((t) => t.id === track.id);
    const isCurrentlyShuffling =
      usePlayerStore.getState().queue?.isShuffle ?? false;
    playList(ids, index, isCurrentlyShuffling);
  };

  const handleToggleFavorite = async (track: Track) => {
    const newStatus = !track.isFavorite;
    if (setTracks) {
      setTracks(
        tracks.map((t) =>
          t.id === track.id ? { ...t, isFavorite: newStatus } : t,
        ),
      );
    }
    updateTrackInStore(track.id, { isFavorite: newStatus });

    try {
      const result = await toggleFavorite(track.id);
      if (result !== null) refreshPlaylists();
    } catch (e) {
      refresh();
    }
  };

  const handleImageChange = async (uri: string) => {
    if (artist?.id) {
      await updateImage(artist.id, uri);
      refresh();
    }
  };

  const handleSelectPlaylist = async (playlist: any) => {
    if (!selectedTrack) return;
    setIsAddModalVisible(false);
    const success = await addTracks(playlist.id, [selectedTrack.id]);
    if (success) refreshPlaylists();
  };

  const trackMenuItems: MenuItem[] = useMemo(
    () => [
      {
        label: "Reproducir",
        icon: "play-outline",
        onPress: () => {
          setIsMenuVisible(false);
          if (selectedTrack) handleTrackPress(selectedTrack);
        },
      },
      {
        label: "Añadir a la cola",
        icon: "list-outline",
        onPress: () => {
          console.log("Queue", selectedTrack?.title);
          setIsMenuVisible(false);
        },
      },
      {
        label: "Añadir a playlist",
        icon: "add-circle-outline",
        onPress: () => {
          setIsMenuVisible(false);
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
              console.log("Eliminación física:", selectedTrack?.id);
              setIsConfirmVisible(false);
            },
          });
          setIsConfirmVisible(true);
          setIsMenuVisible(false);
        },
      },
    ],
    [selectedTrack, tracks],
  );

  useHardwareBack(() => {
    if (isMenuVisible || isAddModalVisible || isConfirmVisible) {
      setIsMenuVisible(false);
      setIsAddModalVisible(false);
      setIsConfirmVisible(false);
      return true;
    }
    return false;
  });

  useFocusEffect(
    useCallback(() => {
      refreshPlaylists();
    }, [refreshPlaylists]),
  );

  const totalDuration = useMemo(() => {
    if (!tracks || tracks.length === 0) return "0 min";
    const totalMs = tracks.reduce((acc, t) => acc + t.duration, 0);
    return formatPlaylistDuration(totalMs);
  }, [tracks]);

  if (isLoading && !artist) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <ArtistHeaderSection
          pictureUrl={artist?.pictureUrl}
          onBackPress={() => navigation.goBack()}
          onImageChange={handleImageChange}
          onResetImage={() => artist?.id && handleImageChange("")}
        />
        <View style={styles.contentCard}>
          <ArtistInfoSection
            name={artist?.name || name}
            songCount={tracks.length}
            duration={totalDuration}
            onPlayPress={() => handlePlayArtist(false)}
            onShufflePress={() => handlePlayArtist(true)}
          />
          <ArtistSongsSection
            tracks={tracks}
            onTrackPress={handleTrackPress}
            onFavoritePress={handleToggleFavorite}
            onOptionsPress={(event, track) => {
              const { pageX, pageY } = event.nativeEvent;
              setSelectedTrack(track);
              setMenuAnchor({ x: pageX, y: pageY });
              setIsMenuVisible(true);
            }}
          />
          <ArtistAlbumsSection
            albums={albums}
            onAlbumPress={(alb) =>
              navigation.push("Album", {
                id: alb.id,
                albumName: alb.title,
                artistName: alb.artistName,
                artwork: alb.artworkUri,
              })
            }
          />
          <ArtistCollaborationsSection
            collaborators={collaborators}
            onArtistPress={(colab) =>
              navigation.push("Artist", { name: colab.name })
            }
          />
        </View>
      </ScrollView>

      <MenuPopover
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        anchorPosition={menuAnchor}
        items={trackMenuItems}
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
  container: { flex: 1, backgroundColor: Colors.white },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  contentCard: {
    backgroundColor: Colors.white,
    marginTop: -50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 0,
    paddingTop: 35,
    paddingBottom: 140,
    minHeight: 600,
    elevation: 20,
  },
});

export default ArtistScreen;
