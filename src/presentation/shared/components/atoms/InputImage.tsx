import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Spacing } from "@/core/theme/spacing";

interface InputImageProps {
  label: string;
  onImagePicked: (uri: string) => void;
  currentImage?: string | null;
}

export const InputImage = ({ label, onImagePicked, currentImage }: InputImageProps) => {
  const [image, setImage] = useState<string | null>(currentImage || null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permisos necesarios", "Necesitamos acceso a tus fotos para cambiar la portada.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7, 
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImage(selectedUri);
      onImagePicked(selectedUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.imageBox} 
        onPress={pickImage} 
        activeOpacity={0.8}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={40} color="#AAA" />
            <Text style={styles.placeholderText}>Toca para subir</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginBottom: Spacing.sm,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  imageBox: {
    width: 180,
    height: 180,
    backgroundColor: "#F5F5F5",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#EEE",
    borderStyle: "dashed",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 12,
    color: "#AAA",
    fontWeight: "600",
  },
});