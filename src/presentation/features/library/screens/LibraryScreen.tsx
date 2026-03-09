import { useState } from "react";
import { StyleSheet, View, Platform, ScrollView } from "react-native";
import { Colors } from "@theme/colors";
import PlaylistPromoSection from "../components/PlaylistPromoSection";
import ScreenHeader from "@components/organisms/ScreenHeader";
import PlaylistHorizontalList from "../components/PlaylistHorizontalList";
import FolderListSection from "../components/FolderListSection";

const USER_PLAYLISTS = [
  {
    id: "1",
    title: "Avicii Stories",
    imageUri:
      "https://www.amoeba.com/sized-images/max/800/800/uploads/albums/covers/other//602547482778.jpg",
  },
  {
    id: "2",
    title: "Kygo",
    imageUri:
      "https://i.scdn.co/image/ab67616d00001e02124a6d221e2a68ee6ac2b020",
  },
  {
    id: "3",
    title: "Pedro Suárez Vértiz",
    imageUri:
      "https://cdn-images.dzcdn.net/images/cover/5d1905c1a17e884f9f508328420441ac/0x1900-000000-80-0-0.jpg",
  },
  {
    id: "4",
    title: "Shalira hits",
    imageUri:
      "https://store.sonymusic.es/cdn/shop/articles/Shakira_560_1.png?v=1708016090",
  },
  {
    id: "5",
    title: "Techno",
    imageUri: "https://miro.medium.com/0*K2jbty9GAtQeAPc1",
  },
  {
    id: "6",
    title: "Hip Hop Peruano Mas Na",
    imageUri:
      "https://i.scdn.co/image/ab6761610000e5eb57d7eb84bed839b92520e7e8",
  },
];

const SYSTEM_PLAYLISTS = [
  {
    id: "s1",
    title: "Tus favoritos",
    imageUri:
      "https://cdn-images.dzcdn.net/images/cover/c826f0c50a44790792218e7f66fb67c5/0x1900-000000-80-0-0.jpg",
  },
  {
    id: "s2",
    title: "Recién agregadas",
    imageUri:
      "https://cdn-images.dzcdn.net/images/cover/3bf0c8c2dde58f17dda729bd641c18da/0x1900-000000-80-0-0.jpg",
  },
  {
    id: "s3",
    title: "Lo más escuchado",
    imageUri:
      "https://cdn-images.dzcdn.net/images/cover/4e98a7af653c67d1030a763a20976c57/0x1900-000000-80-0-0.jpg",
  },
];

const LibraryScreen = () => {
  const [hasPlaylist] = useState(true);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Librería" showAction={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <PlaylistPromoSection hasPlaylist={true} />
        <PlaylistHorizontalList
          sectionTitle="Tus listas de reproducción"
          data={USER_PLAYLISTS}
        />
        <PlaylistHorizontalList
          sectionTitle="Para tí"
          data={SYSTEM_PLAYLISTS}
        />
        <FolderListSection />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 1,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
});

export default LibraryScreen;
