import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@theme/colors';
import { Spacing } from '@theme/spacing';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    height: height * 0.55, 
    backgroundColor: Colors.darkGrey,
    borderBottomLeftRadius: 100, 
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  titleAccent: {
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 22,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: Spacing.xl,
    gap: 8,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  footer: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  buttonOverride: {
    backgroundColor: Colors.primary,
    width: '80%',
    borderRadius: 20, 
    color: Colors.white,
  }
});