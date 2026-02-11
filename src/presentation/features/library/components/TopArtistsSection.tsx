import { View, FlatList, StyleSheet } from 'react-native';
import ArtistCircle from '@components/atoms/ArtistCircle';
import SectionTitle from '@components/atoms/SectionTitle';

const MOCK_ARTISTS = [
  { id: '1', name: 'The Weeknd', photo: { uri: 'https://i0.wp.com/plus.cusica.com/wp-content/uploads/2022/01/698360ec-0075-4b23-808f-da00363878bc.png?fit=1507%2C848&ssl=1' } },
  { id: '2', name: 'Romina Gachoy', photo: { uri: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e6/94/00/e69400ae-e34a-293c-1e71-6d38c151448f/artwork.jpg/1200x630bf-60.jpg' } },
  { id: '3', name: 'Dua Lipa', photo: { uri: 'https://indeksonline.net/wp-content/uploads/2018/01/Dua-Lipa.jpg' } },
  { id: '4', name: 'Arctic Monkeys', photo: { uri: 'https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f' } },
  { id: '5', name: 'Post Malone', photo: { uri: 'https://i.iheart.com/v3/catalog/artist/30779802?ops=fit(720%2C720)' } },
  { id: '6', name: 'Doja Cat', photo: { uri: 'https://wallpapers.com/images/hd/doja-cat-pictures-zbl1psq0tlkoo81z.jpg' } },
  { id: '7', name: 'Imagine Dragons', photo: null },
  { id: '8', name: 'Los Puntos del Amor', photo: { uri: 'https://i.scdn.co/image/ab6761610000e5ebf611657e0f5cff268805c9da' } },
  { id: '9', name: 'Bizarrap', photo: null },
  { id: '10', name: 'Rosalía', photo: { uri: 'https://i.scdn.co/image/ab6761610000e5eb9354faf80eb87961466edfbf' } },
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