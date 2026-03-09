import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface FolderHeaderProps {
  name: string;
  path: string;
}

const FolderHeaderSection = ({ name, path }: FolderHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topNavigationRow}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>        
        <View style={styles.titleWrapper}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.detailRow}>
        <View style={styles.iconBox}>
          <Ionicons name="folder-open" size={35} color="#666" />
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.labelTitle}>Ubicación</Text>
          <Text style={styles.folderPath} numberOfLines={1}>
            {path}
          </Text>
          <View style={styles.statsInline}>
            <View style={styles.statItem}>
              <Ionicons name="musical-notes-outline" size={14} color="#888" />
              <Text style={styles.statText}>124 canciones</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="clock-time-four-outline" size={14} color="#888" />
              <Text style={styles.statText}>8h 45m</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 5,
    marginTop: 30,
    backgroundColor: '#FFF',
  },
  topNavigationRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 5,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 5,
  },
  iconBox: {
    width: 75,
    height: 75,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  infoColumn: {
    flex: 1,
  },
  labelTitle: {
    fontSize: 11,
    color: "#AAA",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: "600",
    marginBottom: 2,
  },
  folderPath: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  statsInline: {
    flexDirection: "row",
    marginTop: 10,
    gap: 15,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statText: {
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },
});

export default FolderHeaderSection;