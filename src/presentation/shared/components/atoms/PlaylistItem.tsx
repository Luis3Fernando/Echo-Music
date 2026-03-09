import { Colors } from "@/core/theme/colors";
import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";

interface PlaylistItemProps {
  title: string;
  imageUri: string;
  onPress: () => void;
}

const PlaylistItem = ({ title, imageUri, onPress }: PlaylistItemProps) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: imageUri }} style={styles.coverImage} />
      <Text style={styles.playlistName} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 130, 
    marginRight: 15,
  },
  coverImage: {
    width: 130,
    height: 140,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  playlistName: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 18,
    paddingHorizontal: 2,
  },
});

export default PlaylistItem;