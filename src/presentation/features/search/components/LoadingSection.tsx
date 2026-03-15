import { Colors } from '@theme/colors';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

const LoadingSection = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <Text style={styles.title}>Buscando ...</Text>
  </View>
);

export default LoadingSection

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  title: { fontSize: 14, fontWeight: '400', marginVertical: 8, color: Colors.black }
});