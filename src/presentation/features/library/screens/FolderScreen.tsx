import { StyleSheet, View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { MOCK_SONGS } from "@/infrastructure/mocks/mock-songs";
import { FOLDER_MOCKS } from "@/infrastructure/mocks/mock-folder";
import FolderHeaderSection from "../components/FolderHeaderSection";
import SongListControls from "../components/SongListControls";
import SongItem from "@components/atoms/SongItem";

const FolderScreen = () => {
  const route = useRoute<any>();
  const { folderId, folderName } = route.params || {};
  const folderData = FOLDER_MOCKS.find((f) => f.id === folderId);

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_SONGS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <FolderHeaderSection
              name={folderName}
              path={folderData?.path || ""}
            />
            <SongListControls />
          </>
        }
        renderItem={({ item }) => (
          <SongItem
            track={item}
            showIndex={false}
            showFavorite={false}
            showArtist={true}
            showOptions={true}
            onPress={(t) => console.log("Reproduciendo:", t.title)}
            onOptionsPress={(t) => console.log("Opciones de:", t.title)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginBottom: 40
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default FolderScreen;
