import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@theme/colors';

import AlbumHeaderSection from '../components/AlbumHeaderSection';
import AlbumInfoSection from '../components/AlbumInfoSection';

const AlbumScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id, albumName, artistName, artwork } = route.params || {};

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Sección 1: Imagen y Back Button */}
        <AlbumHeaderSection 
          artwork={artwork} 
          onBackPress={() => navigation.goBack()} 
        />

        {/* Sección 2: Info del Álbum y Play Button */}
        <AlbumInfoSection 
          title={albumName || "Sin Título"}
          artistName={artistName || "Artista Desconocido"}
          songCount={12} // Valor de prueba por ahora
          duration="45 min" // Valor de prueba por ahora
          onPlayPress={() => console.log("Reproduciendo álbum...")}
        />

        {/* Sección 3: Placeholder para la lista de canciones */}
        <View style={styles.divider} />
        <View style={{ paddingHorizontal: 20 }}>
           {/* Aquí mapearemos los SongItems */}
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
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
    marginBottom: 10,
  }
});

export default AlbumScreen;