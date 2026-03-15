import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import SectionTitle from "@/presentation/shared/components/atoms/SectionTitle";

interface DiscoverySectionProps {
  onSearchQuery: (query: string) => void;
}
 
const SMART_FILTERS = [
  { id: "1", title: "Menos escuchadas", color: Colors.primary, icon: "trending-down-outline" },
  { id: "2", title: "Nunca reproducidas",  color: Colors.primary, icon: "eye-off-outline" },
  { id: "3", title: "Más largas",  color: Colors.primary, icon: "hourglass-outline" },
  { id: "4", title: "Favoritas olvidadas",  color: Colors.primary, icon: "heart-dislike-outline" },
];

const RECENT_HISTORY = ["Rock", "Jazz", "80s", "Rock", "Jazz", "80s", "Rock"];

export const DiscoverySection = ({ onSearchQuery }: DiscoverySectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <SectionTitle title="Búsqueda reciente"></SectionTitle>
        <View style={styles.tagContainer}>
          {RECENT_HISTORY.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => onSearchQuery(item)}
            >
              <Ionicons name="time-outline" size={14} color={Colors.gray} />
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <SectionTitle title="Búsqueda avanzada"></SectionTitle>
        <View style={styles.grid}>
          {SMART_FILTERS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.actionCard}
              onPress={() => onSearchQuery(item.title)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.color + "15" }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={styles.actionTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: Colors.black,
    marginBottom: 15,
    letterSpacing: -0.6,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  tagText: {
    fontSize: 13,
    color: Colors.gray_text,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10
  },
  actionCard: {
    width: "47%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  actionTitle: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default DiscoverySection;