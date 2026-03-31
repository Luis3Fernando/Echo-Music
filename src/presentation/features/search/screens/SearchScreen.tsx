import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, Platform } from "react-native";
import { Colors } from "@theme/colors";
import { Track } from "@entities/track.entity";
import { SearchInput } from "@components/molecules/SearchInput";
import ScreenHeader from "@components/organisms/ScreenHeader";
import DiscoverySection from "../components/DiscoverySection";
import LoadingSection from "../components/LoadingSection";
import ResultsSection from "../components/ResultsSection";
import EmptySection from "../components/EmptySection";
import { MenuItem, MenuPopover } from "@components/atoms/MenuPopover";
import { useDiscovery } from "@/presentation/shared/hooks/use-search.hook";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { results, isLoading, executeSearch, clearResults } = useDiscovery();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

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
      onPress: () => console.log("[Acción] Abriendo selector de playlist"),
    },
    {
      label: "Eliminar",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => console.log("[Acción] Solicitando eliminación de:", selectedTrack?.id),
    },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      executeSearch(text);
    } else {
      clearResults();
    }
  };

  const renderContent = () => {
    if (searchQuery.length === 0) {
      return <DiscoverySection onSearchQuery={handleSearch} />;
    }

    // 2. Cargando
    if (isLoading) {
      return <LoadingSection />;
    }

    const hasResults = 
      (results?.tracks?.length || 0) > 0 || 
      (results?.artists?.length || 0) > 0 || 
      (results?.albums?.length || 0) > 0;

    if (!hasResults) {
      return <EmptySection query={searchQuery} />;
    }

    return (
      <ResultsSection
        tracks={results!.tracks}
        artists={results!.artists}
        albums={results!.albums}
        onTrackPress={(t) => console.log("Play Directo:", t.title)}
        onFavoritePress={(t) => console.log("[LOG] Toggle Favorite:", t.title)}
        onTrackOptionsPress={(event, track) => {
          const { pageX, pageY } = event.nativeEvent;
          setMenuAnchor({ x: pageX, y: pageY });
          setSelectedTrack(track);
          setIsMenuVisible(true);
        }}
        onArtistPress={(a) => console.log("Ver artista:", a.name)}
        onAlbumPress={(album) => console.log("Ver álbum:", album.title)}
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