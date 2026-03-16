import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AlbumCard from '@/presentation/shared/components/atoms/AlbumCard';
import SectionTitle from '@/presentation/shared/components/atoms/SectionTitle';

interface ArtistAlbumsSectionProps {
  albums: any[];
  onAlbumPress: (album: any) => void;
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
              artist: item.artist,
              cover: item.cover
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