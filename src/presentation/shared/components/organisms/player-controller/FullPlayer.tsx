import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FullPlayerProps {
  animatedStyle: any;
  pointerEvents: "auto" | "none";
}

const FullPlayer = ({ animatedStyle, pointerEvents }: FullPlayerProps) => {
  return (
    <Animated.View 
      style={[styles.fullPlayerContent, animatedStyle]}
      pointerEvents={pointerEvents}
    >
      <Text style={styles.fullTitle}>Reproductor</Text>
      <View style={styles.bigArt} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullPlayerContent: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fullTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  bigArt: { 
    width: SCREEN_HEIGHT * 0.4, 
    height: SCREEN_HEIGHT * 0.4, 
    borderRadius: 20, 
    backgroundColor: '#333' 
  }
});

export default FullPlayer;