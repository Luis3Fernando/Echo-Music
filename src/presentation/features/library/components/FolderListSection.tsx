import { FOLDER_MOCKS } from "@/infrastructure/mocks/mock-folder";
import FolderItem from "@components/atoms/FolderItem";
import SectionTitle from "@components/atoms/SectionTitle";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FolderListSection = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <SectionTitle title="Carpetas locales" />
      <View style={styles.listWrapper}>
        {FOLDER_MOCKS.map((folder) => (
          <FolderItem
            key={folder.id}
            name={folder.name}
            path={folder.path}
            onPress={() => {
              console.log(`Navegando a Carpeta: ${folder.name}`);
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
    marginTop: 30,
  },
  listWrapper: {
    marginTop: 5,
  },
});

export default FolderListSection;