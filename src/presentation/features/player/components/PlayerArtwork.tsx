import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface PlayerArtworkProps {
  artworkUri?: string;
}

const PlayerArtwork = ({ artworkUri }: PlayerArtworkProps) => (
  <View style={styles.container}>
    <View style={styles.artworkContainer}>
      <Image 
        source={{ uri: artworkUri || "" }} 
        style={styles.bigArt} 
        resizeMode="cover"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  bigArt: {
    width: SCREEN_WIDTH - 50,
    height: SCREEN_WIDTH - 50,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
});

export default PlayerArtwork;