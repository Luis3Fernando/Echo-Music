import React from 'react';
import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '@theme/colors';
import { FOLDER_MOCKS } from "@/infrastructure/mocks/mock-folder";
import ScreenHeader from "@components/organisms/ScreenHeader";
import FolderHeaderSection from "../components/FolderHeaderSection";

const FolderScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { folderId, folderName } = route.params || {};
  
  const folderData = FOLDER_MOCKS.find(f => f.id === folderId);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FolderHeaderSection 
          name={folderName || "Carpeta Desconocida"} 
          path={folderData?.path || "Ruta no disponible"} 
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
});

export default FolderScreen;