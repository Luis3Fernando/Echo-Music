import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';

interface AlbumCardProps {
  type: 'shuffle' | 'album' | 'scanning';
  data?: {
    title: string;
    artist?: string;
    cover?: any;
    progress?: number;
  };
  onPress?: () => void;
}

const AlbumCard = ({ type, data, onPress }: AlbumCardProps) => {
  if (type === 'shuffle') {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.cardBase, { backgroundColor: '#FF8C00'}]}>
          <View style={styles.shuffleCircle}>
            <Ionicons name="shuffle" size={45} color={Colors.white} />
          </View>
        </View>
        <Text style={styles.title} numberOfLines={1}>Reproducción</Text>
        <Text style={styles.subtitle}>Aleatoria</Text>
      </TouchableOpacity>
    );
  }
  if (type === 'scanning') {
    return (
      <View style={styles.container}>
        <View style={[styles.cardBase, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: '#333' }]}>
          <Ionicons name="scan-outline" size={32} color={Colors.textSecondary} />
          <Text style={styles.scanningText}>{data?.progress}%</Text>
        </View>
        <Text style={styles.title}>Escaneando...</Text>
        <Text style={styles.subtitle}>Buscando música</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image 
        source={data?.cover?.uri ? { uri: data.cover.uri } : require("@assets/img/album_default.png")} 
        style={styles.cardBase} 
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>{data?.title || "Sin título"}</Text>
      <Text style={styles.subtitle} numberOfLines={1}>{data?.artist || "Artista desconocido"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: 140, marginRight: 15 },
  cardBase: {
    width: 140,
    height: 140,
    borderRadius: 14,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  shuffleCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 14,
    color: Colors.black,
  },
  subtitle: {
    fontFamily: 'Jakarta-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  scanningText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Jakarta-Bold',
  }
});

export default AlbumCard;