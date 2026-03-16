import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@theme/colors';

const LyricsSection = () => (
  <View style={styles.lyricsContainer}>
    <Text style={styles.lyricsTitle}>Letras sincronizadas</Text>
    <View style={styles.lyricsPlaceholder}>
      <Text style={styles.lyricsActiveText}>Esta es la línea que está sonando ahora...</Text>
      <Text style={styles.lyricsNormalText}>Y esta es la siguiente línea de la canción.</Text>
      <Text style={styles.lyricsNormalText}>Aquí puedes poner tu sistema de sincronización.</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  lyricsContainer: { flex: 1, width: "100%", paddingTop: 20 },
  lyricsTitle: { fontSize: 22, fontWeight: "800", color: Colors.black, marginBottom: 20 },
  lyricsPlaceholder: { gap: 25 },
  lyricsActiveText: { fontSize: 24, fontWeight: "800", color: Colors.primary, lineHeight: 32 },
  lyricsNormalText: { fontSize: 22, fontWeight: "600", color: "#D0D0D0", lineHeight: 30 },
});

export default LyricsSection;