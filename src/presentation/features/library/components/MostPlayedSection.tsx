import { View, StyleSheet } from 'react-native';
import TrackItem from '@components/atoms/TrackItem';
import SectionTitle from '@components/atoms/SectionTitle';

const MOCK_TRACKS = [
  { id: '1', title: 'Adaptation', artist: 'The Weeknd', cover: { uri: 'https://i1.sndcdn.com/artworks-RmwwoND84IopaYip-sKSvqg-t500x500.jpg' } },
  { id: '2', title: 'Next', artist: 'The Weeknd', cover: { uri: 'https://images.genius.com/a83a29dd26a6e4fe50bba0ef25c7bb19.1000x1000x1.png' } },
  { id: '3', title: 'Flowers', artist: 'Miley Cyrus', cover: { uri: 'https://m.media-amazon.com/images/M/MV5BYzU3ZTFkZDctYmNlNi00ZjMxLTgwNGItYTI1YjdmOWJiNTQzXkEyXkFqcGc@._V1_.jpg' } },
  { id: '4', title: 'As it was', artist: 'Harry Styles', cover: { uri: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14' } },
  { id: '5', title: 'No digas nada', artist: 'Romina Gachoy', cover: { uri: 'https://i.scdn.co/image/ab67616d00001e02629dbcedb03035d0ca38a68e' } },
  { id: '6', title: 'The Adults Are Talking', artist: 'The Strokes', cover: { uri: "https://cdn-images.dzcdn.net/images/cover/f8a0a2e1ec12c1026cd03208237cd934/1900x1900-000000-80-0-0.jpg" } },
  { id: '7', title: "dasdas", artist: "dasda", cover: null },
  { id: '8', title: 'Anti-Hero', artist: 'Taylor Swift', cover: { uri: 'https://m.media-amazon.com/images/M/MV5BYmM5MzM2MDEtMDJmMS00MGRiLWFkODktNGE1NWMzMmM2N2U3XkEyXkFqcGc@._V1_.jpg' } },
];

const MostPlayedSection = () => {
  return (
    <View style={styles.container}>
      <SectionTitle title="Canciones más escuchadas" />
      <View style={styles.grid}>
        {MOCK_TRACKS.map((track) => (
          <TrackItem 
            key={track.id} 
            variant="short" 
            data={track} 
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  }
});

export default MostPlayedSection;