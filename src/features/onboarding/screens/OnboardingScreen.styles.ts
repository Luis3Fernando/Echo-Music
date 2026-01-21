import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 24,
  },
  footer: {
    padding: Spacing.xl,
  },
});