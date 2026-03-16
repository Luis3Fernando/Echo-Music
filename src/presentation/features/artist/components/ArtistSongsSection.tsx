import { StyleSheet, View } from 'react-native';
import SongItem from '@components/atoms/SongItem';
import { Track } from '@entities/track.entity';
import SectionTitle from '@components/atoms/SectionTitle';

interface ArtistSongsSectionProps {
  tracks: Track[];
  onTrackPress: (track: Track) => void;
  onFavoritePress: (track: Track) => void;
  onOptionsPress: (event: any, track: Track) => void;
}

const ArtistSongsSection = ({
  tracks,
  onTrackPress,
  onFavoritePress,
  onOptionsPress,
}: ArtistSongsSectionProps) => {
  if (tracks.length === 0) return null;
  return (
    <View style={styles.container}>
      <SectionTitle title="Canciones" />
      {tracks.map((track) => (
        <SongItem
          key={track.id}
          track={track}
          showIndex={false}
          showArtist={false}
          showArtwork={true}
          showFavorite={true}
          showOptions={true}
          titleVariant={"light"}
          onPress={onTrackPress}
          onFavoritePress={onFavoritePress}
          onOptionsPress={onOptionsPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 20,
  },
});

export default ArtistSongsSection;