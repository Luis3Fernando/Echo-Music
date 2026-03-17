import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ArtistCard = () => {
  const [isFavoriteArtist, setIsFavoriteArtist] = useState(false);

  const artistData = {
    name: "Gian Marco",
    image: "https://i.scdn.co/image/ab677762000056b81a5cd183700ad34badcef04d",
    songCount: 154,
    monthlyListeners: "2.4M"
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.9}
        onPress={() => console.log("Ver perfil del artista")}
      >
        <Image 
          source={{ uri: artistData.image }} 
          style={styles.artistImage} 
        />
        <View style={styles.infoContainer}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.label}>Acerca del artista</Text>
              <Text style={styles.artistName}>{artistData.name}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setIsFavoriteArtist(!isFavoriteArtist)}
              style={styles.favoriteBtn}
            >
              <Ionicons 
                name={isFavoriteArtist ? "heart" : "heart-outline"} 
                size={22} 
                color={isFavoriteArtist ? "#1DB954" : "rgba(255,255,255,0.6)"} 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.stats}>
              <Ionicons name="musical-notes-outline" size={14} color="rgba(255,255,255,0.5)" />
              <Text style={styles.statsText}>{artistData.songCount} canciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.4)" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  card: {
    backgroundColor: '#161616',
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 130,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  artistImage: {
    width: 130,
    height: '100%',
    backgroundColor: '#222',
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  artistName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },
  favoriteBtn: {
    padding: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statsText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ArtistCard;