import { StyleSheet, View, ScrollView } from 'react-native';
import AlbumCard from '@components/atoms/AlbumCard';
import SectionTitle from '@components/atoms/SectionTitle';
import { Album } from '@entities/album.entity';

interface RelatedAlbumsSectionProps {
  albums: Album[];
  onAlbumPress: (album: Album) => void;
}

const RelatedAlbumsSection = ({ albums, onAlbumPress }: RelatedAlbumsSectionProps) => {
  if (!albums || albums.length === 0) return null;
  return (
    <View style={styles.container}>
      <SectionTitle title="Más álbumes" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {albums.map((item) => (
          <AlbumCard
            key={item.id}
            type="album"
            data={{
              title: item.title,
              artist: item.artistName,
              cover: { uri: item.artworkUri }
            }}
            onPress={() => onAlbumPress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginBottom: 30
  },
  scrollContent: {
    paddingHorizontal: 15,
    marginTop: 10,
    gap: 15
  },
});

export default RelatedAlbumsSection;