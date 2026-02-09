import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AlbumCard from '../../../components/atoms/AlbumCard';
import SectionTitle from '@/presentation/components/atoms/SectionTitle';

const MOCK_ALBUMS = [
  { 
    id: '1', 
    title: 'True', 
    artist: 'Avicii', 
    cover: { uri: 'https://dojiw2m9tvv09.cloudfront.net/69046/product/default4537.jpg' } 
  },
  { 
    id: '2', 
    title: '7', 
    artist: 'David Guetta', 
    cover: { uri: 'https://cdn-images.dzcdn.net/images/cover/10c4cbb8b894ad58a82d3f90acfb9114/1900x1900-000000-81-0-0.jpg' } 
  },
  { 
    id: '3', 
    title: 'Justice', 
    artist: 'Justin Bieber', 
    cover: { uri: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431' } 
  },
  { 
    id: '4', 
    title: 'Mañana será Bonito', 
    artist: 'Karol G', 
    cover:null
  },
  { 
    id: '5', 
    title: 'Planet Her', 
    artist: 'Doja Cat', 
    cover: { uri: 'https://i.scdn.co/image/ab67616d0000b2736b98dbf13791547e637e322f' } 
  },
];

const RecentAlbumsSection = ({ isScanning, scanProgress }: { isScanning?: boolean, scanProgress?: number }) => {
  return (
    <View style={styles.section}>
      <SectionTitle title="Albumes recientes" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={MOCK_ALBUMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row' }}>
            {isScanning ? (
              <AlbumCard type="scanning" data={{ title: '', progress: scanProgress }} />
            ) : (
              <AlbumCard type="shuffle" onPress={() => console.log("Shuffle play")} />
            )}
          </View>
        )}
        renderItem={({ item }) => (
          <AlbumCard 
            type="album" 
            data={{ title: item.title, artist: item.artist, cover: item.cover }} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginTop: 25 },
  listContent: { paddingHorizontal: 10, marginTop: 5 }
});

export default RecentAlbumsSection;