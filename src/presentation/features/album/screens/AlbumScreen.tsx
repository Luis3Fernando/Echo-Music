import { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { Track } from "@entities/track.entity";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import { AddToPlaylistModal } from "@components/organisms/AddToPlaylistModal";
import { useTrack } from "@hooks/use-track.hook";
import {
  usePlaylists,
  useAddTracksToPlaylist,
} from "@hooks/use-playlists.hook";
import { formatPlaylistDuration } from "@/core/utils/time";

import AlbumHeaderSection from "../components/AlbumHeaderSection";
import AlbumInfoSection from "../components/AlbumInfoSection";
import AlbumSongsSection from "../components/AlbumSongsSection";
import AlbumArtistsSection from "../components/AlbumArtistsSection";
import RelatedAlbumsSection from "../components/RelatedAlbumsSection";
import { useAlbumDetail, useRelatedAlbums } from "@hooks/use-album.hook";
import { useHardwareBack } from "@hooks/use-hardware-back.hook";

import { usePlayerActions } from "@/presentation/shared/hooks/use-player-actions.hook";
import { usePlayerStore } from "@store/use-player.store";

const AlbumScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id, albumName, artistName, artwork } = route.params || {};

  const { album, tracks, setTracks, isLoading, refresh } = useAlbumDetail(id);
  const { toggleFavorite } = useTrack();
  const { userPlaylists, refreshPlaylists } = usePlaylists();
  const { addTracks } = useAddTracksToPlaylist();

  const { playList } = usePlayerActions();
  const updateTrackInStore = usePlayerStore(s => s.updateTrackInStore);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const { relatedAlbums } = useRelatedAlbums(album?.artistId, id);

  const handlePlayAlbum = (shuffle: boolean) => {
    if (tracks.length === 0) return;
    const ids = tracks.map(t => t.id);
    playList(ids, 0, shuffle);
  };

  const handleTrackPress = (track: Track) => {
    const ids = tracks.map(t => t.id);
    const index = tracks.findIndex(t => t.id === track.id);
    const isShuffleActive = usePlayerStore.getState().queue?.isShuffle ?? false;
    playList(ids, index, isShuffleActive);
  };

  const handleToggleFavorite = async (track: Track) => {
    const newStatus = !track.isFavorite;

    if (setTracks) {
      setTracks(tracks.map(t => t.id === track.id ? { ...t, isFavorite: newStatus } : t));
    }
    updateTrackInStore(track.id, { isFavorite: newStatus });

    try {
      await toggleFavorite(track.id);
      refreshPlaylists();
    } catch (e) {
      refresh();
    }
  };

  const totalDuration = useMemo(() => {
    const totalMs = tracks.reduce((acc, t) => acc + t.duration, 0);
    return formatPlaylistDuration(totalMs);
  }, [tracks]);

  const artistsArray = useMemo(() => {
    const name = album?.artistName || artistName;
    return name ? name.split(",").map((s: string) => s.trim()) : [];
  }, [album, artistName]);

  const handleAlbumPress = (item: any) => {
    navigation.push("Album", {
      id: item.id,
      albumName: item.title,
      artistName: item.artistName,
      artwork: item.artworkUri,
    });
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
        onPress: () => console.log("Add Queue", selectedTrack?.title),
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
        onPress: () => console.log("Delete", selectedTrack?.title),
      },
    ],
    [selectedTrack, tracks],
  );

  useFocusEffect(
    useCallback(() => {
      refreshPlaylists();
    }, [refreshPlaylists]),
  );

  useHardwareBack(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
      return true;
    }
    return false;
  });

  if (isLoading && !album) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AlbumHeaderSection
          artwork={album?.artworkUri || artwork}
          onBackPress={() => navigation.goBack()}
        />
        <AlbumInfoSection
          title={album?.title || albumName}
          artistName={album?.artistName || artistName}
          songCount={tracks.length}
          duration={totalDuration}
          onPlayPress={() => handlePlayAlbum(true)}
        />
        <AlbumArtistsSection
          artists={artistsArray}
          onArtistPress={(name) =>
            navigation.navigate("Artist", {
              artistId: album?.artistId || name.toLowerCase().replace(/\s+/g, "-"),
              name,
            })
          }
        />
        <AlbumSongsSection
          tracks={tracks}
          onTrackPress={handleTrackPress}
          onFavoritePress={handleToggleFavorite}
          onOptionsPress={(event, track) => {
            const { pageX, pageY } = event.nativeEvent;
            setMenuAnchor({ x: pageX, y: pageY });
            setSelectedTrack(track);
            setIsMenuVisible(true);
          }}
        />
        {relatedAlbums.length > 0 && (
          <RelatedAlbumsSection
            albums={relatedAlbums}
            onAlbumPress={handleAlbumPress}
          />
        )}
      </ScrollView>
      <MenuPopover
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        anchorPosition={menuAnchor}
        items={trackMenuItems}
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
    paddingBottom: 120,
  },
});

export default AlbumScreen;