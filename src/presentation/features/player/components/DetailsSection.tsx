import { StyleSheet, View } from "react-native";
import LyricsCard from "./LyricsCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";

const DetailsSection = () => (
  <View style={styles.detailsContainer}>
    <LyricsCard />
    <ArtistCard />
    <AlbumCard /> 
  </View>
);

const styles = StyleSheet.create({
  detailsContainer: { 
    flex: 1, 
    width: "100%",
    paddingBottom: 60,
    paddingHorizontal: 0, 
  }
});

export default DetailsSection;