import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";

interface QuickActionsSectionProps {
  onShuffle: () => void;
  onPlayFavorites: () => void;
  onPlayRecent: () => void;
  onPlayTop: () => void;
}

const QuickActionsSection = ({
  onShuffle,
  onPlayFavorites,
  onPlayRecent,
  onPlayTop,
}: QuickActionsSectionProps) => {
  
  const ACTIONS = [
    {
      id: "shuffle",
      title: "Aleatorio",
      icon: "shuffle",
      color: "#FF9100", 
      onPress: onShuffle,
    },
    {
      id: "favorites",
      title: "Me gusta",
      icon: "heart-outline",
      color: "#D81159", 
      onPress: onPlayFavorites,
    },
    {
      id: "recent",
      title: "Recientes",
      icon: "time-outline",
      color: "#218380", 
      onPress: onPlayRecent,
    },
    {
      id: "top",
      title: "Top",
      icon: "trending-up-outline",
      color: "#73D2DE", 
      onPress: onPlayTop,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        {ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionItem}
            onPress={action.onPress}
            activeOpacity={0.8}
          >
            <View style={[styles.circle, { backgroundColor: action.color }]}>
              <Ionicons name={action.icon as any} size={28} color={Colors.white} />
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    marginTop: 25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.black,
    textAlign: "center",
    letterSpacing: -0.2,
  },
});

export default QuickActionsSection;