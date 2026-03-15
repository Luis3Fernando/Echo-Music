import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AlbumCard from '@/presentation/shared/components/atoms/AlbumCard';
import SectionTitle from '@/presentation/shared/components/atoms/SectionTitle';

interface RelatedAlbumsSectionProps {
  albums: any[];
  onAlbumPress: (album: any) => void;
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
    marginVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 15,
    marginTop: 10,
    gap: 15
  },
});

export default RelatedAlbumsSection;