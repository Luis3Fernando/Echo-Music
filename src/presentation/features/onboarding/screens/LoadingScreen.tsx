import { Colors } from '@/core/theme/colors';
import { useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  SharedValue,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LoadingScreen = () => {
  const opacity1 = useSharedValue(0.2);
  const opacity2 = useSharedValue(0.2);
  const opacity3 = useSharedValue(0.2);

  const startAnimation = (value: SharedValue<number>, delay: number) => {
    value.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.2, { duration: 400 })
        ),
        -1,
        true
      )
    );
  };

  useEffect(() => {
    startAnimation(opacity1, 0);
    startAnimation(opacity2, 200);
    startAnimation(opacity3, 400);
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({ opacity: opacity1.value }));
  const animatedStyle2 = useAnimatedStyle(() => ({ opacity: opacity2.value }));
  const animatedStyle3 = useAnimatedStyle(() => ({ opacity: opacity3.value }));

  return (
    <View style={styles.mainContainer}>
      <View style={styles.centerWrapper}>
        <View style={styles.logoShadow}>
          <Image
            source={require('@assets/icon/app-logo.png')}
            style={styles.centeredLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.dotsRow}>
          <Animated.View style={[styles.dot, animatedStyle1]} />
          <Animated.View style={[styles.dot, animatedStyle2]} />
          <Animated.View style={[styles.dot, animatedStyle3]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoShadow: {
    shadowColor: Colors.background_dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 50,
  },
  centeredLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});

export default LoadingScreen;