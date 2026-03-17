import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

const GIAN_MARCO_LYRICS = [
  "Si ella te gusta tanto",
  "No lo pienses más",
  "Sácala a bailar...",
  "Que la vida se va y no vuelve",
  "Sácala a bailar",
  "No dejes que se pase el tiempo No dejes que se pase el tiempo",
  "Mírala a los ojos",
  "Dile la verdad",
  "Sácala a bailar..."
];

const LyricsCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const translateY = useSharedValue(0);
  const LINE_HEIGHT = 60; 

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev < GIAN_MARCO_LYRICS.length - 1) {
          const next = prev + 1;
          translateY.value = withTiming(-(next * LINE_HEIGHT), { duration: 600 });
          return next;
        }
        clearInterval(interval);
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const animatedListStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Letras</Text>        
        <View style={styles.lyricsViewport}>
          <Animated.View style={animatedListStyle}>
            {GIAN_MARCO_LYRICS.map((line, index) => (
              <View key={index} style={[styles.lineWrapper, { minHeight: LINE_HEIGHT }]}>
                <Text 
                  style={[
                    styles.lyricLine, 
                    index === activeIndex ? styles.activeLine : styles.inactiveLine
                  ]}
                >
                  {line}
                </Text>
              </View>
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#121212', 
    borderRadius: 15,
    padding: 24,
    height: 320, 
    overflow: 'hidden',
  },
  cardTitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  lyricsViewport: {
    flex: 1,
    overflow: 'hidden',
  },
  lineWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  lyricLine: {
    fontWeight: '800',
  },
  activeLine: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  inactiveLine: {
    color: 'rgba(255, 255, 255, 0.2)', 
    fontSize: 22,
  },
});

export default LyricsCard;