import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@theme/colors';
import { FOLDER_MOCKS } from "@/infrastructure/mocks/mock-folder";

const FolderScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { folderId, folderName } = route.params || {};
  const folderData = FOLDER_MOCKS.find(f => f.id === folderId);

  return (
    <View style={styles.container}>
      <Text style={styles.debugHeader}>Explorador de carpeta</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{folderId}</Text>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{folderName}</Text> 
        <Text style={styles.label}>Ruta de acceso:</Text>
        <Text style={styles.pathValue}>{folderData?.path || 'Cargando...'}</Text>
      </View>

      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backBtnText}>Volver a Librería</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FolderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  debugHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 30,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 10
  },
  value: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: '600'
  },
  pathValue: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic'
  },
  backBtn: {
    marginTop: 40,
    backgroundColor: '#1A1A1A',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  backBtnText: {
    color: Colors.white,
    fontWeight: '700'
  }
});