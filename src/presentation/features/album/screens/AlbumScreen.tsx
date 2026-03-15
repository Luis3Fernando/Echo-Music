import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { MOCK_SONGS } from "@mocks/mock-songs";
import { Track } from "@/domain/entities/track.entity";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";

import AlbumHeaderSection from "../components/AlbumHeaderSection";
import AlbumInfoSection from "../components/AlbumInfoSection";
import AlbumSongsSection from "../components/AlbumSongsSection";

const AlbumScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { albumName, artistName, artwork } = route.params || {};

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const albumTracks = MOCK_SONGS.filter((s) => s.albumName === albumName);
  const tracksList = MOCK_SONGS;
  const trackMenuItems: MenuItem[] = [
    {
      label: "Reproducir",
      icon: "play-outline",
      onPress: () => console.log("Play", selectedTrack?.title),
    },
    {
      label: "Añadir a la cola",
      icon: "list-outline",
      onPress: () => console.log("Add Queue", selectedTrack?.title),
    },
    {
      label: "Añadir a playlist",
      icon: "add-circle-outline",
      onPress: () => console.log("Add Playlist", selectedTrack?.title),
    },
    {
      label: "Eliminar",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => console.log("Delete", selectedTrack?.title),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AlbumHeaderSection
          artwork={artwork}
          onBackPress={() => navigation.goBack()}
        />
        <AlbumInfoSection
          title={albumName}
          artistName={artistName}
          songCount={albumTracks.length}
          duration="45 min"
          onPlayPress={() => console.log("Shuffle Album")}
        />
        <View style={styles.divider} />
        <AlbumSongsSection
          tracks={tracksList}
          onTrackPress={(t) => console.log("Reproduciendo:", t.title)}
          onFavoritePress={(t) => console.log("Like:", t.title)}
          onOptionsPress={(event, track) => {
            const { pageX, pageY } = event.nativeEvent;
            setMenuAnchor({ x: pageX, y: pageY });
            setSelectedTrack(track);
            setIsMenuVisible(true);
          }}
        />
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginHorizontal: 16,
    marginBottom: 8,
  },
});

export default AlbumScreen;