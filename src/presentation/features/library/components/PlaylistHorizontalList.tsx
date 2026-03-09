import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlaylistItem from "@components/atoms/PlaylistItem";
import SectionTitle from "@components/atoms/SectionTitle";

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
            title={item.title}
            imageUri={item.imageUri}
            onPress={() => {
              console.log(`Navegando a Playlist ID: ${item.id}`);
              navigation.navigate("Playlist", {
                playlistId: item.id,
                playlistTitle: item.title,
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
