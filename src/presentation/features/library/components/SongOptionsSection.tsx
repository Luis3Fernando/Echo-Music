import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";

interface SongOptionsSectionProps {
  onShufflePress?: () => void;
  onSortChange?: (mode: string) => void;
}

const SongOptionsSection = ({
  onShufflePress,
  onSortChange,
}: SongOptionsSectionProps) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentSort, setCurrentSort] = useState("Recientes");

  const toggleSortMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowSortMenu(!showSortMenu);
  };

  const handleSortSelect = (mode: string) => {
    setCurrentSort(mode);
    setShowSortMenu(false);
    onSortChange?.(mode);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.shuffleButton]}
          onPress={onShufflePress}
          activeOpacity={0.7}
        >
          <Ionicons name="shuffle" size={20} color={Colors.white} />
          <Text style={styles.shuffleText}>Aleatorio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.sortButton]}
          onPress={toggleSortMenu}
          activeOpacity={0.7}
        >
          <Ionicons name="swap-vertical" size={18} color={Colors.black} />
          <Text style={styles.sortText}>{currentSort}</Text>
          <Ionicons
            name={showSortMenu ? "chevron-up" : "chevron-down"}
            size={16}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      {showSortMenu && (
        <View style={styles.menuContainer}>
          {["Recientes", "A - Z", "Artista", "Álbum"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.menuItem}
              onPress={() => handleSortSelect(item)}
            >
              <Text
                style={[
                  styles.menuItemText,
                  currentSort === item && {
                    color: Colors.primary,
                    fontWeight: "700",
                  },
                ]}
              >
                {item}
              </Text>
              {currentSort === item && (
                <Ionicons name="checkmark" size={18} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  shuffleButton: {
    backgroundColor: Colors.primary,
    elevation: 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sortButton: {
    backgroundColor: "#E9ECEF",
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  shuffleText: {
    color: "#FFF",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 14,
  },
  sortText: {
    color: Colors.black,
    fontWeight: "600",
    marginHorizontal: 8,
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: "#495057",
  },
});

export default SongOptionsSection;
