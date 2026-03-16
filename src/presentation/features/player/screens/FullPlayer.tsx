import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Animated from "react-native-reanimated";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import PlayerSection from "../components/PlayerSection";
import LyricsSection from "../components/LyricsSection";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface FullPlayerProps {
  animatedStyle?: any;
  onClose: () => void;
}

const FullPlayer = ({ animatedStyle, onClose }: FullPlayerProps) => {
  return (
    <View style={[styles.fullPlayerContent, animatedStyle]}>
      <BottomSheetScrollView 
      key="full-player-scroll"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        // focusHook={useIsFocused} // Si usas navegación
      >
              {/* HEADER FIJO (Solo indicador y botón de bajar) */}
      <View style={styles.fixedHeader}>
        <View style={styles.indicator} />
        <View style={styles.headerActions}>
          <Ionicons 
            name="chevron-down" 
            size={30} 
            color="#000" 
            onPress={onClose} 
          />
          <Text style={styles.playingFrom}>REPRODUCIENDO DESDE ARTISTA</Text>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </View>
      </View>

        {/* SECCIÓN 1: REPRODUCTOR (Ocupa el alto de la pantalla) */}
        <View style={styles.mainPlayerWrapper}>
          <PlayerSection />
        </View>

        {/* SECCIÓN 2: LETRAS (Aparece abajo al scrollear) */}
        <View style={styles.lyricsWrapper}>
          <LyricsSection />
        </View>
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPlayerContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fixedHeader: {
    paddingTop: 12,
    alignItems: "center",
  },
  indicator: {
    width: 36,
    height: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    marginBottom: 10,
  },
  headerActions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 40,
  },
  playingFrom: {
    fontSize: 10,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 1,
  },
  scrollContainer: {
    // Esto asegura que el contenido sea scrolleable
    paddingBottom: 60,
  },
  mainPlayerWrapper: {
    // Hacemos que la sección del player sea alta para que tape las letras al inicio
    height: SCREEN_HEIGHT * 0.82, 
    justifyContent: "center",
  },
  lyricsWrapper: {
    paddingHorizontal: 30,
    marginTop: 20,
    minHeight: 400, // Altura para las letras
  },
});

export default FullPlayer;