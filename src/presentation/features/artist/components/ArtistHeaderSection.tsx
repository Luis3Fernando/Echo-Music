import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

interface ArtistHeaderSectionProps {
  pictureUrl?: string;
  onBackPress: () => void;
  onImageChange?: (uri: string) => void;
}

const ArtistHeaderSection = ({ pictureUrl, onBackPress, onImageChange }: ArtistHeaderSectionProps) => {
  
  const handleEditPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Permisos denegados para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      console.log('Imagen seleccionada y recortada:', selectedUri);
      onImageChange?.(selectedUri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={pictureUrl ? { uri: pictureUrl } : require("@assets/img/artist_default.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBackPress}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={handleEditPress}
        activeOpacity={0.8}
      >
        <Ionicons name="camera-outline" size={22} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width * 0.95,
    backgroundColor: Colors.light,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    right: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});

export default ArtistHeaderSection;