import { View, FlatList, StyleSheet } from "react-native";
import AlbumCard from "@components/atoms/AlbumCard";
import SectionTitle from "@components/atoms/SectionTitle";
import { useNavigation } from "@react-navigation/native";
import { Album } from "@entities/album.entity";

interface AlbumSectionProps {
  title: string;
  data: Album[];
}

const AlbumSection = ({ title, data }: AlbumSectionProps) => {
  const navigation = useNavigation<any>();

  if (data.length === 0) return null;

  return (
    <View style={styles.section}>
      <SectionTitle title={title} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <AlbumCard
            type="album"
            data={{
              title: item.title,
              artist: item.artistName,
              cover: item.artworkUri ? { uri: item.artworkUri } : null,
            }}
            onPress={() =>
              navigation.navigate("Album", {
                id: item.id,
                albumName: item.title,
                artistName: item.artistName,
                artwork: item.artworkUri || undefined,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  listContent: { paddingHorizontal: 15, marginTop: 5 },
});

export default AlbumSection;