import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import SectionTitle from "@components/atoms/SectionTitle";

const LibraryStatsSection = () => {
  const stats = [
    { label: "Canciones", value: "1,240", icon: "musical-notes-outline", target: "Songs" },
    { label: "Artistas", value: "148", icon: "people-outline", target: "Artists" },
    { label: "Álbumes", value: "82", icon: "albums-outline", target: "Albums" },
    { label: "Sin escuchar", value: "34", icon: "library-outline", target: "NotPlayed" },
  ];

  const handlePress = (target: string) => {
    console.log(`Navegando a: ${target}`);
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Tu Resumen" />
      <View style={styles.grid}>
        {stats.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.statCard}
            onPress={() => handlePress(item.target)}
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