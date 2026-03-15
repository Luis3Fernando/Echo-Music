import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@theme/colors";
import SongItem from "@components/atoms/SongItem";
import { Track } from "@entities/track.entity";

interface ResultsSectionProps {
  results: Track[];
  onTrackPress: (track: Track) => void;
  onTrackOptionsPress: (event: any, track: Track) => void;
}

const ResultsSection = ({ results, onTrackPress, onTrackOptionsPress }: ResultsSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mejores resultados</Text>
      
      {results.map((item) => (
        <SongItem
          key={item.id}
          track={item}
          showFavorite={true}
          onPress={onTrackPress}
          onOptionsPress={onTrackOptionsPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 15,
    marginLeft: 5,
  },
});

export default ResultsSection;