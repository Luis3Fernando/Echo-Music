import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import { Colors } from "@theme/colors";
import { Track } from "@entities/track.entity";
import { SearchInput } from "@components/molecules/SearchInput";
import ScreenHeader from "@components/organisms/ScreenHeader";
import DiscoverySection from "../components/DiscoverySection";
import LoadingSection from "../components/LoadingSection";
import ResultsSection from "../components/ResultsSection";
import EmptySection from "../components/EmptySection";
import { MenuItem, MenuPopover } from "@components/atoms/MenuPopover";
import { ConfirmDialog } from "@components/organisms/ConfirmDialog";
import { AddToPlaylistModal } from "@components/organisms/AddToPlaylistModal";
import { useDiscovery } from "@hooks/use-search.hook";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTrack } from "@hooks/use-track.hook";
import {
  useAddTracksToPlaylist,
  usePlaylists,
} from "@hooks/use-playlists.hook";

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const { results, isLoading, executeSearch, clearResults, setResults } =
    useDiscovery();
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

  useFocusEffect(
    useCallback(() => {
      refreshPlaylists();
    }, [refreshPlaylists]),
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      executeSearch(text);
    } else {
      clearResults();
    }
  };

  const handleToggleFavorite = async (track: Track) => {
    const newFavoriteStatus = !track.isFavorite;
    if (results) {
      const updatedTracks = results.tracks.map((t) =>
        t.id === track.id ? { ...t, isFavorite: newFavoriteStatus } : t,
      );
      setResults({
        ...results,
        tracks: updatedTracks,
      });
    }

    try {
      await toggleFavorite(track.id);
    } catch (error) {
      console.error("Error al guardar favorito", error);
    }
  };

  const handleSelectPlaylist = async (playlist: any) => {
    if (!selectedTrack) return;
    setIsAddModalVisible(false);
    await addTracks(playlist.id, [selectedTrack.id]);
    refreshPlaylists();
  };

  const trackMenuItems: MenuItem[] = [
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
        setIsMenuVisible(false);
        setConfirmData({
          title: "Eliminar canción",
          description:
            "¿Deseas eliminar permanentemente de tu memoria interna?",
          onConfirm: () => {
            console.log("Eliminando:", selectedTrack?.id);
            setIsConfirmVisible(false);
          },
        });
        setIsConfirmVisible(true);
      },
    },
  ];

  const renderContent = () => {
    if (searchQuery.length === 0)
      return <DiscoverySection onSearchQuery={handleSearch} />;
    if (isLoading) return <LoadingSection />;

    const hasResults =
      (results?.tracks?.length || 0) > 0 ||
      (results?.artists?.length || 0) > 0 ||
      (results?.albums?.length || 0) > 0;
    if (!hasResults) return <EmptySection query={searchQuery} />;

    return (
      <ResultsSection
        tracks={results!.tracks}
        artists={results!.artists}
        albums={results!.albums}
        onTrackPress={(t) => console.log("Reproduciendo:", t.title)}
        onFavoritePress={handleToggleFavorite}
        onArtistPress={(artist) =>
          navigation.navigate("Artist", {
            artistId: artist.id,
            name: artist.name,
          })
        }
        onAlbumPress={(album) =>
          navigation.navigate("Album", {
            id: album.id,
            albumName: album.title,
            artistName: album.artistName,
            artwork: album.artworkUri || undefined,
          })
        }
        onTrackOptionsPress={(event, track) => {
          const { pageX, pageY } = event.nativeEvent;
          setMenuAnchor({ x: pageX, y: pageY });
          setSelectedTrack(track);
          setIsMenuVisible(true);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Descubrir" showAction={false} />
      <SearchInput
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={() => handleSearch("")}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {renderContent()}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  scrollContent: { flexGrow: 1, paddingBottom: 120 },
});

export default SearchScreen;
