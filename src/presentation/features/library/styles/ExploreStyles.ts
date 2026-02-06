// presentation/styles/screens/ExploreStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@theme/colors'; // Ajusta la ruta a tu proyecto

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Fondo siempre blanco
    paddingHorizontal: 1, // Padding mínimo como pediste para pegar elementos al borde
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15, // Un poco de aire solo para el texto del header
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 40, // Más grande para el toque punk
    fontWeight: '900',
    color: Colors.black,
    letterSpacing: -2,
  },
  headerIndicator: {
    height: 6,
    width: 25,
    backgroundColor: Colors.primary, // Usando tu color énfasis
    borderRadius: 0, // Cuadrado para look más agresivo/minimalista
    marginTop: -5,
  },
  searchButton: {
    padding: 10,
    backgroundColor: Colors.muted,
    borderRadius: 50,
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