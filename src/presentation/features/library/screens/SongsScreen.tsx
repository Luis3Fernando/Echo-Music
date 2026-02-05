import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useLibrary } from '@/logic/hooks/useLibrary';
import { Colors } from '@/core/theme/colors';

export const SongsScreen = () => {
  const { songs } = useLibrary();

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  songItem: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: '#AAA',
    fontSize: 14,
  },
});