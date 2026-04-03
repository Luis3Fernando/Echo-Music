import { useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import PlayerArtwork from "./PlayerArtwork";
import PlayerInfo from "./PlayerInfo";
import PlayerProgressBar from "./PlayerProgressBar";
import PlayerControls from "./PlayerControls";
import { usePlayerActions } from "@/presentation/shared/hooks/use-player-actions.hook";
import { usePlayerStore } from "@store/use-player.store";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PlayerSection = () => {
  const flatListRef = useRef<FlatList>(null);
  const isInitialMount = useRef(true);

  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.queue?.currentIndex ?? 0);
  const queueArtworks = usePlayerStore((s) => s.queueArtworks);
  const { skipToNext, skipToPrevious, togglePlayPause } = usePlayerActions();

  const activeIds = queue?.isShuffle ? queue.shuffledTracks : queue?.tracks || [];

  useEffect(() => {
    if (activeIds.length > 0) {
      if (isInitialMount.current) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: false,
        });
        isInitialMount.current = false;
      } else {
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }
    }
  }, [currentIndex, activeIds.length]);

  return (
    <View style={styles.section}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={activeIds}
          keyExtractor={(id) => id}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          initialNumToRender={3}
          windowSize={5}
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
      <PlayerProgressBar currentTime="0:00" duration="0:00" />
      <PlayerControls 
        onNext={skipToNext} 
        onPrev={skipToPrevious} 
        onPlayPause={togglePlayPause} 
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