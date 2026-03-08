import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@theme/colors";
import { MOCK_TRACK } from '@mocks/mock-track';

interface MiniPlayerProps {
  animatedStyle: any;
}

const MiniPlayer = ({ animatedStyle }: MiniPlayerProps) => {
  const track = MOCK_TRACK;

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <Image source={{ uri: track.artworkUri || '' }} style={styles.artwork} />
      
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{track.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{track.artistName}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn}>
          <Ionicons name="play-back" size={22} color={Colors.black} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playBtn}>
          <Ionicons name="play" size={24} color={Colors.black} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtn}>
          <Ionicons name="play-forward" size={22} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 75,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    position: 'absolute',
    width: '95%',
    alignSelf: 'center',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  },
  artist: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlBtn: {
    padding: 5,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MiniPlayer;