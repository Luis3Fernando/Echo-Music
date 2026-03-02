import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@theme/colors';
import { useSpotifyArtist } from '@hooks/useSpotifyArtist'; // Importamos el hook

interface ArtistCircleProps {
  data: {
    name: string;
    // Ya no necesitamos pasar la photo desde afuera, el componente la busca
  };
  onPress?: () => void;
}

const ArtistCircle = ({ data, onPress }: ArtistCircleProps) => {
  // El hook hace la magia usando solo el nombre
  const { photo, loading } = useSpotifyArtist(data.name);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {/* Mostramos el loader mientras la API responde */}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        )}

        <Image 
          source={photo?.uri ? { uri: photo.uri } : require("@assets/img/artist_default.jpg")} 
          style={[styles.photo, loading && { opacity: 0 }]} // Ocultamos la imagen mientras carga
        />
      </View>
      
      <Text style={styles.name} numberOfLines={2}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 10, // Ajustado para que el gap del FlatList sea más limpio
    alignItems: 'center',
  },
  imageContainer: {
    width: 90, // Un poco más compacto se ve más premium
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 11, // Un poco más pequeño para que el "numberOfLines={2}" no rompa la UI
    color: Colors.black,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 2,
    lineHeight: 14,
  },
});

export default ArtistCircle;