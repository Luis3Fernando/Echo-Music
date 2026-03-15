import { StyleSheet, View, ScrollView } from 'react-native';
import ArtistCircle from '@components/atoms/ArtistCircle';
import SectionTitle from '@components/atoms/SectionTitle';

interface AlbumArtistsSectionProps {
  artists: string[];
  onArtistPress: (name: string) => void;
}

const AlbumArtistsSection = ({ artists, onArtistPress }: AlbumArtistsSectionProps) => {
  if (!artists || artists.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionTitle title="Artistas" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {artists.map((name, index) => (
          <ArtistCircle
            key={`${name}-${index}`}
            data={{ name }}
            onPress={() => onArtistPress(name)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});

export default AlbumArtistsSection;