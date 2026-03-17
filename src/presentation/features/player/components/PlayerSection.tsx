import { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { FlatList } from 'react-native-gesture-handler'; 
import { MOCK_SONGS } from '@mocks/mock-songs';
import PlayerArtwork from './PlayerArtwork';
import PlayerInfo from './PlayerInfo';
import PlayerProgressBar from './PlayerProgressBar';
import PlayerControls from './PlayerControls';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PlayerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const currentTrack = MOCK_SONGS[currentIndex];

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= MOCK_SONGS.length) return;
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index !== currentIndex) setCurrentIndex(index);
  };

  return (
    <View style={styles.section}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={MOCK_SONGS}
          renderItem={({ item }) => <PlayerArtwork artworkUri={item.artworkUri ?? undefined} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          disallowInterruption={true} 
        />
      </View>
      <PlayerInfo 
        title={currentTrack.title}
        artistName={currentTrack.artistName}
        onArtistPress={() => console.log("Ir al artista")}
      />
      <PlayerProgressBar 
        currentTime="1:20" 
        duration="3:45" 
      />
      <PlayerControls 
        onNext={() => scrollToIndex(currentIndex + 1)}
        onPrev={() => scrollToIndex(currentIndex - 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { flex: 1, alignItems: "center", width: '100%', marginTop: -10 },
  carouselContainer: { height: 380, width: SCREEN_WIDTH },
});

export default PlayerSection;