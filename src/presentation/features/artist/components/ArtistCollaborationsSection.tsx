import { StyleSheet, View, ScrollView } from 'react-native';
import ArtistCircle from '@components/atoms/ArtistCircle';
import SectionTitle from '@components/atoms/SectionTitle';

interface ArtistCollaborationsSectionProps {
  collaborators: string[];
  onArtistPress: (name: string) => void;
}

const ArtistCollaborationsSection = ({ 
  collaborators, 
  onArtistPress 
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
        {collaborators.map((name, index) => (
          <ArtistCircle
            key={`${name}-${index}`}
            data={{ name }}
            onPress={() => onArtistPress(name)}
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
    backgroundColor: 'white'
  },
  scrollContent: {
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 10,
  },
});

export default ArtistCollaborationsSection;