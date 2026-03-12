import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Playlist } from "@entities/playlist.entity";
import PlaylistItem from "@components/atoms/PlaylistItem";
import SectionTitle from "@components/atoms/SectionTitle";

interface PlaylistHorizontalListProps {
  sectionTitle: string;
  data: Playlist[];
}

const PlaylistHorizontalList = ({
  sectionTitle,
  data,
}: PlaylistHorizontalListProps) => {
  const navigation = useNavigation<any>();

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
            name={item.name}
            artworkUri={item.artworkUri}
            onPress={() => {
              navigation.navigate("Playlist", {
                id: item.id,
                name: item.name,
              });
            }}
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