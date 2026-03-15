import React, { useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, Platform } from "react-native";
import { Colors } from "@theme/colors";
import { MOCK_SONGS } from "@mocks/mock-songs";
import { Track } from "@entities/track.entity";
import { SearchInput } from "@components/molecules/SearchInput";
import ScreenHeader from "@components/organisms/ScreenHeader";
import DiscoverySection from "../components/DiscoverySection";
import LoadingSection from "../components/LoadingSection";
import ResultsSection from "../components/ResultsSection";
import EmptySection from "../components/EmptySection";
import { Artist } from "@entities/artist.entity";
import { MenuItem, MenuPopover } from "@components/atoms/MenuPopover";

interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  albums: { title: string; artist: string; artwork?: string }[];
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [results, setResults] = useState<SearchResults>({
    tracks: [],
    artists: [],
    albums: []
  });

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  const trackMenuItems: MenuItem[] = [
    {
      label: "Reproducir",
      icon: "play-outline",
      onPress: () => console.log("[Acción] Reproduciendo:", selectedTrack?.title),
    },
    {
      label: "Añadir a la cola",
      icon: "list-outline",
      onPress: () => console.log("[Acción] Añadido a la cola:", selectedTrack?.title),
    },
    {
      label: "Añadir a playlist",
      icon: "add-circle-outline",
      onPress: () => console.log("[Acción] Abriendo selector de playlist para:", selectedTrack?.title),
    },
    {
      label: "Eliminar",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => console.log("[Acción] Solicitando eliminación de:", selectedTrack?.id),
    },
  ];

  const handleTextChange = (text: string) => {
    setSearchQuery(text);

    if (text.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const tracks = MOCK_SONGS;

        const uniqueArtistNames = Array.from(new Set(MOCK_SONGS.map(s => s.artistName)));
        const artists: Artist[] = uniqueArtistNames.map((name, index) => ({
          id: `artist-${index}`,
          name: name,
          pictureUrl: "", 
          isProcessed: true,
          description: null,
          socialLinks: [],
          reels: []
        }));

        const uniqueAlbums = Array.from(new Set(MOCK_SONGS.map(s => s.albumName)));
        const albums = uniqueAlbums.map(name => {
          const song = MOCK_SONGS.find(s => s.albumName === name);
          return {
            title: name,
            artist: song?.artistName || "Varios Artistas",
            artwork: song?.artworkUri || undefined
          };
        });
        setResults({ tracks, artists, albums });
      }, 400);
    } else {
      setIsLoading(false);
      setResults({ tracks: [], artists: [], albums: [] });
    }
  };

 const renderContent = () => {
    if (searchQuery.length === 0) return <DiscoverySection onSearchQuery={handleTextChange} />;
    if (isLoading) return <LoadingSection />;
    if (results.tracks.length === 0 && results.artists.length === 0) return <EmptySection query={searchQuery} />;
    
    return (
      <ResultsSection
        tracks={results.tracks}
        artists={results.artists}
        albums={results.albums}
        onTrackPress={(t) => console.log("Play Directo:", t.title)}
        onFavoritePress={(t) => console.log("[LOG] Me gusta presionado para:", t.title)}
        onTrackOptionsPress={(event, track) => {
          const { pageX, pageY } = event.nativeEvent;
          setMenuAnchor({ x: pageX, y: pageY });
          setSelectedTrack(track);
          setIsMenuVisible(true);
        }}
        onArtistPress={(a) => console.log("Ver artista:", a.name)}
        onAlbumPress={(album) => console.log("Ver álbum:", album)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Descubrir" showAction={false} />
      <SearchInput
        value={searchQuery}
        onChangeText={handleTextChange}
        onClear={() => handleTextChange("")}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
});

export default SearchScreen;