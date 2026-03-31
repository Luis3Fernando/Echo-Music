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

const ArtistScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { name } = route.params;

  const { artist, tracks, albums, collaborators, isLoading, refresh } =
    useArtistProfile(name);
  const { userPlaylists, refreshPlaylists } = usePlaylists();
  const { addTracks } = useAddTracksToPlaylist();
  const { toggleFavorite } = useTrack();

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

  useHardwareBack(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
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

  const trackMenuItems: MenuItem[] = useMemo(
    () => [
      {
        label: "Reproducir",
        icon: "play-outline",
        onPress: () => {
          console.log("Play", selectedTrack?.title);
          setIsMenuVisible(false);
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
              console.log(
                "LOG: Eliminación física pendiente para",
                selectedTrack?.id,
              );
              setIsConfirmVisible(false);
            },
          });
          setIsConfirmVisible(true);
          setIsMenuVisible(false);
        },
      },
    ],
    [selectedTrack],
  );

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
        />
        <View style={styles.contentCard}>
          <ArtistInfoSection
            name={artist?.name || name}
            songCount={tracks.length}
            duration={totalDuration}
            onPlayPress={() => console.log("Shuffle total")}
            onShufflePress={() => console.log("Shuffle")}
          />
          <ArtistSongsSection
            tracks={tracks}
            onTrackPress={(t) => console.log("Play", t.title)}
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
