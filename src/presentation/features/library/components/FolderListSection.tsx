import FolderItem from "@components/atoms/FolderItem";
import SectionTitle from "@components/atoms/SectionTitle";
import { View, StyleSheet } from "react-native";

const FOLDER_MOCKS = [
  { id: "f1", name: "Descargas", path: "/storage/emulated/0/Download" },
  { id: "f2", name: "WhatsApp Audio", path: "/storage/emulated/0/WhatsApp/Media" },
  { id: "f3", name: "Echo Music Local", path: "/storage/emulated/0/Music/Echo" },
  { id: "f4", name: "Audio", path: "/storage/emulated/0/Music" },
  { id: "f5", name: "Music", path: "/storage/emulated/0/Music/Music/Music" },
];

const FolderListSection = () => {
  return (
    <View style={styles.container}>
      <SectionTitle title="Carpetas locales" />
      <View style={styles.listWrapper}>
        {FOLDER_MOCKS.map((folder) => (
          <FolderItem
            key={folder.id}
            name={folder.name}
            path={folder.path}
            onPress={() => console.log(`Evento: Abriendo carpeta ${folder.name}`)}
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