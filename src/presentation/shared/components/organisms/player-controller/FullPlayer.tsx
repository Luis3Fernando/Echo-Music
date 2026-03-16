import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Colors } from "@theme/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FullPlayerProps {
  onClose: () => void;
  animatedStyle?: any;
}

interface FullPlayerProps {
  onClose: () => void;
  animatedStyle?: any;
}

const FullPlayer = ({ onClose, animatedStyle }: FullPlayerProps) => {
  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      {/* El indicador se queda afuera para que siempre sea visible */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>

      <BottomSheetScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainPlayerSection}>
          <View style={styles.bigArt} />

          <View style={styles.infoContainer}>
            <Text style={styles.fullTitle}>Nombre de la Canción</Text>
            <Text style={styles.fullArtist}>Artista de la Pista</Text>
          </View>

          <View style={styles.controlsWrapper}>
            {/* ... (tus barras de progreso y controles igual) */}
          </View>
        </View>

        <View style={styles.extraContent}>
          <Text style={styles.sectionTitle}>Letras</Text>
          <View style={styles.lyricsPlaceholder}>
            <Text style={styles.lyricsText}>
               {/* ... tu texto */}
            </Text>
            <View style={styles.dummyContent} />
          </View>
        </View>
      </BottomSheetScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFF" },
  indicatorContainer: {
    height: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingBottom: 100,
  },
  mainPlayerSection: {
    alignItems: "center",
    minHeight: SCREEN_HEIGHT * 0.8, // Asegura que ocupe casi toda la pantalla
  },
  bigArt: {
    width: SCREEN_HEIGHT * 0.38,
    height: SCREEN_HEIGHT * 0.38,
    borderRadius: 28,
    backgroundColor: "#F0F0F0",
    marginTop: 20,
  },
  infoContainer: { marginTop: 40, width: "100%", alignItems: "center" },
  fullTitle: { fontSize: 24, fontWeight: "800", color: "#1A1A1A" },
  fullArtist: { fontSize: 18, color: "#707070", marginTop: 4 },
  controlsWrapper: { width: "100%", marginTop: 40 },
  progressBar: { width: "100%", height: 4, backgroundColor: "#F0F0F0", borderRadius: 2 },
  progressFill: { width: "35%", height: "100%", backgroundColor: "#1A1A1A" },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  timeText: { fontSize: 12, color: "#A0A0A0" },
  playbackControls: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 30, marginTop: 30 },
  playButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#1A1A1A" },
  sideControl: { width: 45, height: 45, borderRadius: 25, backgroundColor: "#F8F9FA" },
  
  // Estilos del contenido extra
  extraContent: { marginTop: 40, paddingBottom: 140 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
  lyricsPlaceholder: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 20,
  },
  lyricsText: { fontSize: 18, color: "#333", lineHeight: 28 },
  dummyContent: {
    height: 400, // Alto para forzar el scroll
    width: "100%",
    backgroundColor: "#EEE",
    marginTop: 20,
    borderRadius: 15,
  }
});

export default FullPlayer;