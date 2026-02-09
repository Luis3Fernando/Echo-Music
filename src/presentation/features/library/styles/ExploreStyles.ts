import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@theme/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, 
    paddingHorizontal: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 15,
  }
});