import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { useFocusEffect } from "@react-navigation/native";
import SectionTitle from "@/presentation/shared/components/atoms/SectionTitle";
import { useLibraryStats } from "@hooks/use-library-stats.hook";

const LibraryStatsSection = () => {
  const { stats, refresh } = useLibraryStats();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-PE").format(num);
  };

  const statItems = [
    { 
      label: "Canciones", 
      value: formatNumber(stats.totalTracks), 
      icon: "musical-notes-outline", 
      target: "Songs" 
    },
    { 
      label: "Artistas", 
      value: formatNumber(stats.totalArtists), 
      icon: "people-outline", 
      target: "Artists" 
    },
    { 
      label: "Álbumes", 
      value: formatNumber(stats.totalAlbums), 
      icon: "albums-outline", 
      target: "Albums" 
    },
    { 
      label: "Sin escuchar", 
      value: formatNumber(stats.neverPlayedCount), 
      icon: "library-outline", 
      target: "NotPlayed" 
    },
  ];

  return (
    <View style={styles.container}>
      <SectionTitle title="Tu Resumen" />
      <View style={styles.grid}>
        {statItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.statCard}
            onPress={() => console.log(`Navegando a: ${item.target}`)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    gap: 12, 
  },
  statCard: {
    backgroundColor: "#F8F9FA",
    width: "48%", 
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statLabel: {
    fontSize: 10,
    color: "#8E8E93",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  statValue: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "800",
  },
});

export default LibraryStatsSection;