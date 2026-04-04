import { useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import PlayerArtwork from "./PlayerArtwork";
import PlayerInfo from "./PlayerInfo";
import PlayerProgressBar from "./PlayerProgressBar";
import PlayerControls from "./PlayerControls";
import { usePlayerActions } from "@hooks/use-player-actions.hook";
import { usePlayerStore } from "@store/use-player.store";
import TrackPlayer, { useTrackPlayerEvents, Event } from "react-native-track-player";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PlayerSection = () => {
  const flatListRef = useRef<FlatList>(null);
  const isInitialMount = useRef(true);

  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.queue?.currentIndex ?? 0);
  const queueArtworks = usePlayerStore((s) => s.queueArtworks);
  const { skipToNext, skipToPrevious, togglePlayPause, loadTrackMetadata } = usePlayerActions();
  const updateIndex = usePlayerStore((s) => s.updateIndex);

  const activeIds = queue?.isShuffle
    ? queue.shuffledTracks
    : queue?.tracks || [];

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.index !== undefined) {
      if (event.index !== currentIndex) {
        console.log("🎶 [AUTO-SKIP] Canción terminó. Actualizando estado global al índice:", event.index);
        
        updateIndex(event.index);
        
        await loadTrackMetadata(event.index);
      }
    }
  });

  useEffect(() => {
    if (activeIds.length > 0 && flatListRef.current) {
      if (isInitialMount.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex,
          animated: false,
        });
        isInitialMount.current = false;
      } else {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: currentIndex,
            animated: true,
          });
        }, 150);
      }
    }
  }, [currentIndex, activeIds.length])

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
          extraData={queueArtworks}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          renderItem={({ item }) => (
            <PlayerArtwork artworkUri={queueArtworks[item]} />
          )}
        />
      </View>
      <PlayerInfo onArtistPress={() => console.log("Ir al artista")} />
      <PlayerProgressBar />
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
    marginTop: -10,
  },
  carouselContainer: {
    height: 380,
    width: SCREEN_WIDTH,
  },
});

export default PlayerSection;
