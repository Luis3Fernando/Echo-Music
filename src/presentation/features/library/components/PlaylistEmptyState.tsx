import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";

interface PlaylistEmptyStateProps {
  message?: string;
  description?: string;
}

const PlaylistEmptyState = ({
  message = "Tu lista está vacio",
  description = "No hay canciones aquí todavía. Empieza a armar tu ritmo agregando algunas canciones.",
}: PlaylistEmptyStateProps) => {
  const { height: screenHeight } = useWindowDimensions();

  return (
    <View style={[styles.container, { minHeight: screenHeight * 0.4 }]}>
      <View style={styles.iconContainer}>
        <Ionicons name="albums-outline" size={64} color={Colors.gray_light} />
        <View style={styles.plusBadge}>
          <Ionicons name="add" size={20} color={Colors.primary} />
        </View>
      </View>
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: "transparent",
  },
  iconContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  plusBadge: {
    position: 'absolute',
    bottom: -4,
    right: -8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.black,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: Colors.gray_text,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },
});

export default PlaylistEmptyState;