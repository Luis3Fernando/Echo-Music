import { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import PlayerArtwork from "./PlayerArtwork";
import PlayerInfo from "./PlayerInfo";
import PlayerProgressBar from "./PlayerProgressBar";
import PlayerControls from "./PlayerControls";
import { usePlayerActions } from "@/presentation/shared/hooks/use-player-actions.hook";
import { usePlayerStore } from "@store/use-player.store";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PlayerSection = () => {
  const flatListRef = useRef<FlatList>(null);
  
  // Selectores atómicos para evitar re-renders innecesarios
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.queue?.currentIndex ?? 0);
  const queueArtworks = usePlayerStore((s) => s.queueArtworks); // ¡Importante para las portadas!
  
  const { skipToNext, skipToPrevious, jumpToIndex } = usePlayerActions();

  const activeIds = queue?.isShuffle ? queue.shuffledTracks : queue?.tracks || [];

  // Sincroniza el carrusel cuando el índice cambia por BOTONES (Next/Prev)
  useEffect(() => {
    if (activeIds.length > 0) {
      // Validamos si el scroll ya está en la posición correcta para no forzarlo
      flatListRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Calculamos el índice basado en la posición final del scroll
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    
    // Solo actualizamos si el índice realmente cambió para evitar bucles
    if (index !== currentIndex && index >= 0 && index < activeIds.length) {
      jumpToIndex(index);
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={activeIds}
          keyExtractor={(id) => id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          // Optimizaciones de rendimiento
          removeClippedSubviews={false} // Mantener vecinos para swipe fluido
          initialNumToRender={3}
          windowSize={5}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          renderItem={({ item }) => (
            <PlayerArtwork artworkUri={queueArtworks[item]} />
          )}
        />
      </View>

      <PlayerInfo onArtistPress={() => console.log("Ir al artista")} />
      
      {/* Estos valores vendrán del motor de audio en el siguiente paso */}
      <PlayerProgressBar currentTime="0:00" duration="0:00" />
      
      <PlayerControls 
        onNext={skipToNext} 
        onPrev={skipToPrevious} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { 
    flex: 1, 
    alignItems: "center", 
    width: "100%", 
    marginTop: -10 
  },
  carouselContainer: { 
    height: 380, 
    width: SCREEN_WIDTH 
  },
});

export default PlayerSection;