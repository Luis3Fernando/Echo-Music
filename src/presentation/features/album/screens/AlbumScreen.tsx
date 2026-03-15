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
import AlbumArtistsSection from "../components/AlbumArtistsSection";
import RelatedAlbumsSection from "../components/RelatedAlbumsSection";

const AlbumScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { albumName, artistName, artwork } = route.params || {};

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const albumTracks = MOCK_SONGS.filter((s) => s.albumName === albumName);
  const listTracks = MOCK_SONGS;
  const artistsArray = artistName
    ? artistName.split(",").map((s: string) => s.trim())
    : [];

  const relatedAlbumsMock = [
    {
      id: "1",
      title: "Motion",
      artist: artistName,
      cover: {
        uri: "https://cdn-images.dzcdn.net/images/cover/c8cca4b2786e84e768fa0070d6c2fe96/0x1900-000000-80-0-0.jpg",
      },
    },
    {
      id: "2",
      title: "Funk Wav Bounces",
      artist: artistName,
      cover: {
        uri: "https://cdn-p.smehost.net/sites/fd05a75e01604d70b122e9e1bef31d6a/wp-content/uploads/Havanna-Album-Artwork.jpeg",
      },
    },
    {
      id: "3",
      title: "Motion",
      artist: artistName,
      cover: {
        uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-album-cover-template-design-8c1c49849522f3e17e0776f15dd6e47e_screen.jpg?ts=1731804009",
      },
    },
    {
      id: "4",
      title: "Funk Wav Bounces",
      artist: artistName,
      cover: {
        uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/moon-pink-cloud-cd-cover-music-design-template-dfd448b74fd90ea7cefe3e5970921877_screen.jpg?ts=1617891152",
      },
    },
  ];

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

  const handleAlbumPress = (album: any) => {
    navigation.push("Album", {
      id: album.id,
      albumName: album.title,
      artistName: album.artist,
      artwork: album.cover?.uri,
    });
  };

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
        <AlbumArtistsSection
          artists={artistsArray}
          onArtistPress={(name) =>
            navigation.navigate("Artist", {
              artistId: name.toLowerCase().replace(/\s+/g, "-"),
              name,
            })
          }
        />
        <View style={styles.divider} />
        <AlbumSongsSection
          tracks={listTracks}
          onTrackPress={(t) => console.log("Playing:", t.title)}
          onFavoritePress={(t) => console.log("Like:", t.title)}
          onOptionsPress={(event, track) => {
            const { pageX, pageY } = event.nativeEvent;
            setMenuAnchor({ x: pageX, y: pageY });
            setSelectedTrack(track);
            setIsMenuVisible(true);
          }}
        />
        <View style={styles.divider} />
        <RelatedAlbumsSection
          albums={relatedAlbumsMock}
          onAlbumPress={handleAlbumPress}
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
    paddingBottom: 120,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginHorizontal: 16,
    marginVertical: 5,
  },
});

export default AlbumScreen;
