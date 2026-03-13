import { StyleSheet, View, Platform, ScrollView } from "react-native";
import { Colors } from "@theme/colors";
import { SYSTEM_PLAYLISTS, USER_PLAYLISTS } from "@mocks/mock-playlists";
import ScreenHeader from "@components/organisms/ScreenHeader";
import PlaylistHorizontalList from "../components/PlaylistHorizontalList";
import FolderListSection from "../components/FolderListSection";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Librería" showAction={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
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