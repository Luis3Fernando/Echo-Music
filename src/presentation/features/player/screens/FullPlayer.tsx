import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Colors } from "@theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface FullPlayerProps {
  onClose: () => void;
  animatedStyle?: any;
}

const FullPlayer = ({ animatedStyle }: FullPlayerProps) => {
  return (
    // flex: 1 es vital aquí para que el ScrollView sepa su límite
    <Animated.View style={[styles.root, animatedStyle]}>
      
      {/* Indicador fuera del ScrollView para que no se mueva */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>

      <BottomSheetScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECCIÓN PRINCIPAL */}
        <View style={styles.mainPlayerSection}>
          <View style={styles.bigArt} />

          <View style={styles.infoContainer}>
            <Text style={styles.fullTitle} numberOfLines={1}>
              Nombre de la Canción
            </Text>
            <Text style={styles.fullArtist} numberOfLines={1}>
              Artista de la Pista
            </Text>
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

        {/* SECCIÓN DE CONTENIDO EXTRA */}
        <View style={styles.extraContent}>
          <Text style={styles.sectionTitle}>Letras</Text>
          <View style={styles.lyricsPlaceholder}>
            <Text style={styles.lyricsText}>
              "Esta es una línea de la letra..."{"\n"}
              "Que se puede scrollear hacia abajo"{"\n"}
              "Sin que se cierre el player"{"\n"}
              "A menos que estés arriba de todo"
            </Text>
            
            {/* Contenido de prueba largo */}
            <View style={styles.dummyContent} />
          </View>
        </View>
      </BottomSheetScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: "#FFF" 
  },
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
    paddingHorizontal: 30,
    // Un padding inferior generoso para que el contenido no choque con el borde
    paddingBottom: 60, 
  },
  mainPlayerSection: {
    alignItems: "center",
    paddingBottom: 30,
  },
  bigArt: {
    // Usamos el ancho de pantalla para que sea responsivo
    width: SCREEN_WIDTH - 60,
    height: SCREEN_WIDTH - 60,
    borderRadius: 24,
    backgroundColor: "#F2F2F2",
    marginTop: 10,
  },
  infoContainer: { 
    marginTop: 30, 
    width: "100%", 
    alignItems: "center" 
  },
  fullTitle: { 
    fontSize: 26, 
    fontWeight: "800", 
    color: "#1A1A1A" 
  },
  fullArtist: { 
    fontSize: 18, 
    color: "#707070", 
    marginTop: 4 
  },
  controlsWrapper: { 
    width: "100%", 
    marginTop: 35 
  },
  progressBar: { 
    width: "100%", 
    height: 6, 
    backgroundColor: "#F0F0F0", 
    borderRadius: 3 
  },
  progressFill: { 
    width: "35%", 
    height: "100%", 
    backgroundColor: "#1A1A1A", 
    borderRadius: 3 
  },
  timeRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 10 
  },
  timeText: { 
    fontSize: 12, 
    color: "#A0A0A0", 
    fontWeight: "600" 
  },
  playbackControls: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    gap: 35, 
    marginTop: 30 
  },
  playButton: { 
    width: 76, 
    height: 76, 
    borderRadius: 38, 
    backgroundColor: "#1A1A1A" 
  },
  sideControl: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: "#F8F9FA" 
  },
  extraContent: { 
    marginTop: 20, 

    marginBottom: 250,
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: "700", 
    marginBottom: 15,
    color: "#1A1A1A"
  },
  lyricsPlaceholder: {
    backgroundColor: "#F8F9FA",
    padding: 24,
    borderRadius: 24,
  },
  lyricsText: { 
    fontSize: 18, 
    color: "#333", 
    lineHeight: 30,
    fontWeight: "500"
  },
  dummyContent: {
    height: 600,
    width: "100%",
    backgroundColor: "#EEE",
    marginTop: 20,
    borderRadius: 20,
  }
});

export default FullPlayer;