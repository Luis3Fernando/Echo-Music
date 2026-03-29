import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@theme/colors";
import ScreenHeader from "@components/organisms/ScreenHeader";
import PlaylistHorizontalList from "../components/PlaylistHorizontalList";
import FolderListSection from "../components/FolderListSection";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { usePlaylists } from "@hooks/use-playlists.hook";
import { useCallback } from "react";

const LibraryScreen = () => {
  const navigation = useNavigation<any>();
  const { systemPlaylists, userPlaylists, isLoading, refreshPlaylists } =
    usePlaylists();

  useFocusEffect(
    useCallback(() => {
      refreshPlaylists();
    }, [refreshPlaylists]),
  );

  if (isLoading && systemPlaylists.length === 0 && userPlaylists.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Librería"
        showAction={true}
        actionIconName="add-circle-outline"
        onActionPress={() => navigation.navigate("PlaylistForm")}
      />
      <ScrollView
        style={{ marginTop: 5 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {userPlaylists.length > 0 && (
          <PlaylistHorizontalList
            sectionTitle="Tus listas de reproducción"
            data={userPlaylists}
          />
        )}
        {systemPlaylists.length > 0 && (
          <PlaylistHorizontalList
            sectionTitle="Para tí"
            data={systemPlaylists}
          />
        )}
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
