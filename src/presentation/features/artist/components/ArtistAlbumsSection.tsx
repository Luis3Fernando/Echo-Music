import { StyleSheet, View, ScrollView } from 'react-native';
import { Album } from '@entities/album.entity';
import AlbumCard from '@components/atoms/AlbumCard';
import SectionTitle from '@components/atoms/SectionTitle';

interface ArtistAlbumsSectionProps {
  albums: Album[];
  onAlbumPress: (album: Album) => void;
}

const ArtistAlbumsSection = ({ albums, onAlbumPress }: ArtistAlbumsSectionProps) => {
  if (!albums || albums.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionTitle title="Álbumes" />
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
              cover: item.artworkUri ? { uri: item.artworkUri } : undefined,
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
    marginTop: 0,
  },
  scrollContent: {
    paddingTop: 10,
    paddingHorizontal: 15,
    gap: 15,
  },
});

export default ArtistAlbumsSection;