import PlaylistItem from "@components/atoms/PlaylistItem";
import SectionTitle from "@components/atoms/SectionTitle";
import { FlatList, StyleSheet, View } from "react-native";

interface PlaylistData {
  id: string;
  title: string;
  imageUri: string;
}

interface PlaylistHorizontalListProps {
  sectionTitle: string;
  data: PlaylistData[];
}

const PlaylistHorizontalList = ({
  sectionTitle,
  data,
}: PlaylistHorizontalListProps) => {
  return (
    <View style={styles.container}>
      <SectionTitle title={sectionTitle} />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <PlaylistItem
            title={item.title}
            imageUri={item.imageUri}
            onPress={() => console.log(`Navegando a playlist: ${item.title}`)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
  },
  listPadding: {
    paddingTop: 3,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default PlaylistHorizontalList;
