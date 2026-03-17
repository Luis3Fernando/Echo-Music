import { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { FlatList } from 'react-native-gesture-handler'; 
import { Colors } from '@theme/colors';
import { MOCK_SONGS } from '@mocks/mock-songs';
import PlayerArtwork from './PlayerArtwork';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PlayerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTrack = MOCK_SONGS[currentIndex];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    
    if (roundIndex !== currentIndex) {
      setCurrentIndex(roundIndex);
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.carouselContainer}>
        <FlatList
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
      <View style={styles.infoContainer}>
        <Text style={styles.fullTitle} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={styles.fullArtist} numberOfLines={1}>
          {currentTrack.artistName}
        </Text>
      </View>
      <View style={styles.controlsWrapper}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '45%' }]} /> 
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
};

const styles = StyleSheet.create({
  section: { 
    flex: 1, 
    alignItems: "center",
    width: '100%',
    marginTop: -10
  },
  carouselContainer: {
    height: 380,
    width: SCREEN_WIDTH,
  },
  infoContainer: { 
    marginTop: 30, 
    width: "100%", 
    alignItems: "center",
    paddingHorizontal: 30 
  },
  fullTitle: { fontSize: 26, fontWeight: "800", color: "#1A1A1A", textAlign: 'center' },
  fullArtist: { fontSize: 18, color: "#707070", marginTop: 6, textAlign: 'center' },
  controlsWrapper: { width: "100%", marginTop: 35, paddingHorizontal: 35 },
  progressBar: { width: "100%", height: 6, backgroundColor: "#F0F0F0", borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: "100%", backgroundColor: Colors.primary },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  timeText: { fontSize: 12, color: "#A0A0A0", fontWeight: "600" },
  playbackControls: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 35, marginTop: 30 },
  playButton: { width: 76, height: 76, borderRadius: 38, backgroundColor: "#1A1A1A" },
  sideControl: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#F8F9FA" },
});

export default PlayerSection;