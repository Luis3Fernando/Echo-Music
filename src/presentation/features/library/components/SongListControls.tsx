import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";

interface SongListControlsProps {
  orderLabel: string;
  onOrderPress: (event: GestureResponderEvent) => void;
  onShufflePress: () => void;
  onPlayAllPress: () => void;
}

const SongListControls = ({ 
  orderLabel, 
  onOrderPress, 
  onShufflePress, 
  onPlayAllPress 
}: SongListControlsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.orderButton} 
        activeOpacity={0.7}
        onPress={(e) => onOrderPress(e)}
      >
        <Ionicons name="swap-vertical" size={18} color="#666" />
        <Text style={styles.orderText}>{orderLabel}</Text>
      </TouchableOpacity>

      <View style={styles.rightButtons}>
        <TouchableOpacity 
          style={styles.iconCircle} 
          activeOpacity={0.7}
          onPress={onShufflePress}
        >
          <Ionicons name="shuffle" size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconCircle, styles.playBtn]}
          activeOpacity={0.8}
          onPress={onPlayAllPress}
        >
          <Ionicons name="play" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  orderButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F5F5F5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  orderText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    backgroundColor: Colors.primary,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingLeft: 3
  },
});

export default SongListControls;