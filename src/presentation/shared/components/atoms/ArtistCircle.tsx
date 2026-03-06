import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@theme/colors';
import { useArtist } from '@/presentation/shared/hooks/use-artist.hook';
import { Artist } from '@/domain/entities/artist.entity';

interface ArtistCircleProps {
  data: {
    name: string;
  };
  onPress?: () => void;
}

const ArtistCircle = ({ data, onPress }: ArtistCircleProps) => {
  const { fetchArtist, loading } = useArtist();
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    fetchArtist(data.name).then((result) => {
      if (isMounted) setArtist(result);
    });

    return () => { isMounted = false; };
  }, [data.name, fetchArtist]);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        )}

        <Image 
          source={
            artist?.pictureUrl 
              ? { uri: artist.pictureUrl } 
              : require("@assets/img/artist_default.jpg")
          } 
          style={[styles.photo, loading && { opacity: 0 }]} 
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
    marginRight: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 90,
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
    fontSize: 11,
    color: Colors.black,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 2,
    lineHeight: 14,
  },
});

export default ArtistCircle;