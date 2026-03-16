import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArtistCircle from "@/presentation/shared/components/atoms/ArtistCircle";
import SectionTitle from "@/presentation/shared/components/atoms/SectionTitle";

const MOCK_ARTISTS = [
  { id: "1", name: "Julio Iglesias" },
  { id: "2", name: "Sigala" },
  { id: "3", name: "Nervo" },
  { id: "4", name: "Orion" },
  { id: "5", name: "Vicetone" },
  { id: "6", name: "tINI" },
  { id: "7", name: "Los Caligaris" },
  { id: "8", name: "Galantis" },
  { id: "9", name: "Selena Gomez" },
  { id: "10", name: "Afrojack" },
  { id: "11", name: "Son del Duke" },
  { id: "12", name: "Rels B" },
];

const TopArtistsSection = () => {
  const navigation = useNavigation<any>();

  const handleArtistPress = (item: { id: string, name: string }) => {
    navigation.navigate("Artist", { 
      artistId: item.id, 
      name: item.name 
    });
  };

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
            onPress={() => handleArtistPress(item)}
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