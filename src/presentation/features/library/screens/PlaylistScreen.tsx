import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@theme/colors';

const PlaylistScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { playlistId, playlistTitle } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.debugText}>Pantalla de Detalle</Text>
      <Text style={styles.infoText}>ID de Playlist: {playlistId}</Text>
      <Text style={styles.infoText}>Título: {playlistTitle}</Text>
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: Colors.white }}>Regresar a Librería</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  debugText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primary
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10
  },
  backBtn: {
    marginTop: 30,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10
  }
});