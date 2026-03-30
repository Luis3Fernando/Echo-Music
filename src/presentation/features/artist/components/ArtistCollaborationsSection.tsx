import { StyleSheet, View, ScrollView } from "react-native";
import ArtistCircle from "@components/atoms/ArtistCircle";
import SectionTitle from "@components/atoms/SectionTitle";
import { Artist } from "@entities/artist.entity";

interface ArtistCollaborationsSectionProps {
  collaborators: Artist[];
  onArtistPress: (artist: Artist) => void;
}

const ArtistCollaborationsSection = ({
  collaborators,
  onArtistPress,
}: ArtistCollaborationsSectionProps) => {
  if (!collaborators || collaborators.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionTitle title="Colaboraciones" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {collaborators.map((artist) => (
          <ArtistCircle
            key={artist.id}
            data={{ name: artist.name }}
            onPress={() => onArtistPress(artist)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 10,
  },
});

export default ArtistCollaborationsSection;
