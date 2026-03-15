import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@theme/colors';
import AlbumHeaderSection from '../components/AlbumHeaderSection';

const AlbumScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id, albumName, artistName, artwork } = route.params || {};

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AlbumHeaderSection 
          artwork={artwork} 
          onBackPress={() => navigation.goBack()} 
        />

        <View style={styles.infoContainer}>
          <Text style={styles.albumTitle}>{albumName || "Sin Título"}</Text>
          <Text style={styles.artistName}>{artistName || "Artista Desconocido"}</Text>
          
          <View style={styles.metaData}>
            <Text style={styles.metaText}>Álbum • 2026</Text>
          </View>
        </View>

        <View style={styles.songsContainer}>
           <Text style={styles.placeholderText}>
             Listado de canciones para el ID: {id}
           </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  albumTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  artistName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 4,
  },
  metaData: {
    marginTop: 10,
  },
  metaText: {
    fontSize: 14,
    color: Colors.gray_text,
    fontWeight: '500',
  },
  songsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  placeholderText: {
    color: Colors.gray_text,
    fontSize: 14,
  },
});

export default AlbumScreen;