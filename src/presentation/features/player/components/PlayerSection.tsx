import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Colors } from '@theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PlayerSection = () => (
  <View style={styles.section}>
    <View style={styles.artworkContainer}>
      <View style={styles.bigArt} />
    </View>

    <View style={styles.infoContainer}>
      <Text style={styles.fullTitle} numberOfLines={1}>Nombre de la Canción</Text>
      <Text style={styles.fullArtist} numberOfLines={1}>Artista de la Pista</Text>
    </View>

    <View style={styles.controlsWrapper}>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>1:20</Text>
        <Text style={styles.timeText}>3:45</Text>
      </View>

      <View style={styles.playbackControls}>
        <View style={styles.sideControl} />
        <View style={styles.playButton} />
        <View style={styles.sideControl} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: { flex: 1, alignItems: "center" },
  artworkContainer: {
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  bigArt: {
    width: SCREEN_WIDTH - 80,
    height: SCREEN_WIDTH - 80,
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
  },
  infoContainer: { marginTop: 40, width: "100%", alignItems: "center" },
  fullTitle: { fontSize: 26, fontWeight: "800", color: "#1A1A1A" },
  fullArtist: { fontSize: 18, color: "#707070", marginTop: 4 },
  controlsWrapper: { width: "100%", marginTop: 40 },
  progressBar: { width: "100%", height: 6, backgroundColor: "#F0F0F0", borderRadius: 3 },
  progressFill: { width: "35%", height: "100%", backgroundColor: Colors.primary, borderRadius: 3 },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  timeText: { fontSize: 12, color: "#A0A0A0", fontWeight: "600" },
  playbackControls: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 35, marginTop: 30 },
  playButton: { width: 76, height: 76, borderRadius: 38, backgroundColor: "#1A1A1A" },
  sideControl: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#F8F9FA" },
});

export default PlayerSection;