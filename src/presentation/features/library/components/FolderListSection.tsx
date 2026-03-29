import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FolderItem from "@components/atoms/FolderItem";
import SectionTitle from "@components/atoms/SectionTitle";
import { useFolders } from "@hooks/use-folders.hook";
import { Colors } from "@theme/colors";

const FolderListSection = () => {
  const navigation = useNavigation<any>();
  const { folders, isLoading } = useFolders();

  if (isLoading && folders.length === 0) {
    return <ActivityIndicator color={Colors.primary} style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <SectionTitle title="Carpetas locales" />
      <View style={styles.listWrapper}>
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            name={folder.name}
            path={folder.path}
            onPress={() => {
              navigation.navigate("Folder", { 
                folderId: folder.id, 
                folderName: folder.name 
              });
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  listWrapper: {
    marginTop: 5,
  },
});

export default FolderListSection;