import { StyleSheet, View, Text } from "react-native";
import LyricsCard from "./LyricsCard";

const DetailsSection = () => (
  <View style={styles.lyricsContainer}>
    <LyricsCard />
  </View>
);

const styles = StyleSheet.create({
  lyricsContainer: { flex: 1, width: "100%" }
});

export default DetailsSection;
