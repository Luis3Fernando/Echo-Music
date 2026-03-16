import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { useArtist } from "@hooks/use-artist.hook";
import { Artist } from "@entities/artist.entity";
import { MOCK_SONGS } from "@mocks/mock-songs";
import { Track } from "@/domain/entities/track.entity";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";

import ArtistHeaderSection from "../components/ArtistHeaderSection";
import ArtistInfoSection from "../components/ArtistInfoSection";
import ArtistSongsSection from "../components/ArtistSongsSection";

const ArtistScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { name } = route.params;

  const { fetchArtist, loading } = useArtist();
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const artistSongs = MOCK_SONGS;

  useEffect(() => {
    fetchArtist(name).then(setArtistData);
  }, [name]);

  const trackMenuItems: MenuItem[] = [
    { label: "Reproducir", icon: "play-outline", onPress: () => console.log("Play", selectedTrack?.title) },
    { label: "Añadir a la cola", icon: "list-outline", onPress: () => console.log("Queue", selectedTrack?.title) },
    { label: "Añadir a playlist", icon: "add-circle-outline", onPress: () => console.log("Playlist", selectedTrack?.title) },
    { label: "Eliminar", icon: "trash-outline", variant: "danger", onPress: () => console.log("Eliminar", selectedTrack?.id) },
  ];

  if (loading && !artistData) {
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
          pictureUrl={artistData?.pictureUrl}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.contentCard}>
          <ArtistInfoSection 
            name={name}
            songCount={artistSongs.length}
            duration="Varía"
            onPlayPress={() => console.log("Reproducir éxitos")}
            onShufflePress={() => console.log("Modo aleatorio")}
          />
          <ArtistSongsSection 
            tracks={artistSongs}
            onTrackPress={(t) => console.log("Reproduciendo:", t.title)}
            onFavoritePress={(t) => console.log("Like:", t.title)}
            onOptionsPress={(event, track) => {
              const { pageX, pageY } = event.nativeEvent;
              setMenuAnchor({ x: pageX, y: pageY });
              setSelectedTrack(track);
              setIsMenuVisible(true);
            }}
          />
        </View>
      </ScrollView>
      <MenuPopover
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        anchorPosition={menuAnchor}
        items={trackMenuItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  contentCard: {
    backgroundColor: Colors.white,
    marginTop: -50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 10,
    paddingTop: 35,
    minHeight: 800,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 20,
  }
});

export default ArtistScreen;