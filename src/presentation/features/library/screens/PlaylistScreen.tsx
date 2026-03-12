import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Colors } from '@/core/theme/colors';
import { LibraryStackParamList } from '@navigation/LibraryNavigator';

type PlaylistScreenRouteProp = RouteProp<LibraryStackParamList, 'Playlist'>;

const PlaylistScreen = () => {
  const route = useRoute<PlaylistScreenRouteProp>();
  const navigation = useNavigation();
  const { id, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.debugText}>Detalle de Playlist</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>ID:</Text>
        <Text style={styles.infoValue}>{id}</Text>
        
        <Text style={[styles.infoLabel, { marginTop: 10 }]}>Nombre:</Text>
        <Text style={styles.infoValue}>{name}</Text>
      </View>

      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backBtnText}>Regresar a Librería</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  debugText: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 30,
    color: Colors.primary
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  infoLabel: { fontSize: 12, color: '#888', fontWeight: 'bold' },
  infoValue: { fontSize: 18, color: '#333', fontWeight: '600' },
  backBtn: {
    marginTop: 40,
    backgroundColor: Colors.black,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30
  },
  backBtnText: { color: Colors.white, fontWeight: 'bold' }
});