import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

interface ArtistHeaderSectionProps {
  pictureUrl?: string;
  onBackPress: () => void;
  onImageChange?: (uri: string) => void;
  onResetImage?: () => void;
}

const ArtistHeaderSection = ({
  pictureUrl,
  onBackPress,
  onImageChange,
  onResetImage,
}: ArtistHeaderSectionProps) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [pictureUrl]);

  const handleEditPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
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
      onImageChange?.(selectedUri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          pictureUrl && !imageError
            ? { uri: pictureUrl }
            : require("@assets/img/artist_default.png")
        }
        onError={() => setImageError(true)}
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
      <View style={styles.rightActionsContainer}>
        {onResetImage && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onResetImage}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleEditPress}
          activeOpacity={0.8}
        >
          <Ionicons name="camera-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
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
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 40,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  rightActionsContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 40,
    right: 20,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
});

export default ArtistHeaderSection;
