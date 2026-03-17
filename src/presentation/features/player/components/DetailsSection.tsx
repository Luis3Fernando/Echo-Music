import { StyleSheet, View } from "react-native";
import LyricsCard from "./LyricsCard";
import ArtistCard from "./ArtistCard";

const DetailsSection = () => (
  <View style={styles.detailsContainer}>
    <LyricsCard />
    <ArtistCard />
  </View>
);

const styles = StyleSheet.create({
  detailsContainer: { 
    flex: 1, 
    width: "100%",
    paddingBottom: 50
  }
});

export default DetailsSection;