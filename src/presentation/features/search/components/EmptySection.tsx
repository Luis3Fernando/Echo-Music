import { Colors } from "@theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export const EmptySection = ({ query }: { query: string }) => (
  <View style={styles.center}>
    <Ionicons name="musical-note-outline" size={80} color="#DDD" />
    <Text style={styles.title}>Sin resultados</Text>
    <Text style={{ textAlign: "center", color: "#666", paddingHorizontal: 20 }}>
      No pudimos encontrar nada para "{query}"
    </Text>
  </View>
);
export default EmptySection;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 140,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: Colors.black,
  },
});
