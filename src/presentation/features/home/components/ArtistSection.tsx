import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArtistCircle from "@/presentation/shared/components/atoms/ArtistCircle";
import SectionTitle from "@/presentation/shared/components/atoms/SectionTitle";
import { Artist } from "@entities/artist.entity";

interface ArtistSectionProps {
  title: string;
  data: Artist[];
}

const ArtistSection = ({ title, data }: ArtistSectionProps) => {
  const navigation = useNavigation<any>();

  if (!data || data.length === 0) return null;

  const handleArtistPress = (item: Artist) => {
    navigation.navigate("Artist", { 
      artistId: item.id, 
      name: item.name 
    });
  };

  return (
    <View style={styles.container}>
      <SectionTitle title={title} />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ArtistCircle
            data={{
              name: item.name,
            }}
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
    gap: 10, 
    marginTop: 10,
  },
});

export default ArtistSection;