import { View, StyleSheet } from "react-native";
import TrackItem from "@components/atoms/TrackItem";
import SectionTitle from "@components/atoms/SectionTitle";
import { Track } from "@entities/track.entity";

interface MostPlayedSectionProps {
  data: Track[];
}

const MostPlayedSection = ({ data }: MostPlayedSectionProps) => {
  if (data.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionTitle title="Canciones más escuchadas" />
      <View style={styles.grid}>
        {data.map((track) => (
          <TrackItem
            key={track.id}
            variant="short"
            data={{
              title: track.title,
              artist: track.artistName,
              cover: track.artworkUri ? { uri: track.artworkUri } : null,
            }}
            onPress={() => console.log("Reproduciendo:", track.title)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 0,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default MostPlayedSection;
