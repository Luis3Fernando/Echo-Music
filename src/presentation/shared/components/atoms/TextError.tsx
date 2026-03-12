import { Colors } from "@theme/colors";
import { Text, StyleSheet } from "react-native";

export const TextError = ({ children }: { children?: string }) => {
  if (!children) return null;
  return <Text style={styles.error}>{children}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 0,
    marginLeft: 4,
    fontWeight: "600",
  },
});