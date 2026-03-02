import { View, FlatList, StyleSheet } from "react-native";
import ArtistCircle from "@/presentation/shared/components/atoms/ArtistCircle";
import SectionTitle from "@/presentation/shared/components/atoms/SectionTitle";

const MOCK_ARTISTS = [
  { id: "1", name: "The Weeknd" },
  { id: "2", name: "Romina Gachoy" },
  { id: "3", name: "Dua Lipa" },
  { id: "4", name: "Arctic Monkeys" },
  { id: "5", name: "Post Malone" },
  { id: "6", name: "Doja Cat" },
  { id: "7", name: "Imagine Dragons" },
  { id: "8", name: "Los Puntos del Amor" },
  { id: "9", name: "Bizarrap" },
  { id: "10", name: "Rosalía" },
];

const TopArtistsSection = () => {
  return (
    <View style={styles.container}>
      <SectionTitle title="Artistas favoritos" />
      <FlatList
        data={MOCK_ARTISTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ArtistCircle
            data={item}
            onPress={() => console.log("Perfil de:", item.name)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  listContent: {
    paddingHorizontal: 15,
    gap: 5,
  },
});

export default TopArtistsSection;
