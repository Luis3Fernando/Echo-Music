import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";

export const DiscoverySection = () => (
  <View style={styles.center}>
    <Text style={styles.title}>Explorar categorías</Text>
    <Text style={{color: '#666'}}>Aquí irán tus Moods y Géneros...</Text>
  </View>
);

export default DiscoverySection

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: Colors.black }
});