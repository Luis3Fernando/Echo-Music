import { Colors } from '@theme/colors';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

const LoadingSection = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

export default LoadingSection

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: Colors.black }
});