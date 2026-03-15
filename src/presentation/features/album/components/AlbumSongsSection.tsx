import { StyleSheet, View } from 'react-native';
import SongItem from '@components/atoms/SongItem';
import { Track } from '@/domain/entities/track.entity';

interface AlbumSongsSectionProps {
  tracks: Track[];
  onTrackPress: (track: Track) => void;
  onFavoritePress: (track: Track) => void;
  onOptionsPress: (event: any, track: Track) => void;
}

const AlbumSongsSection = ({
  tracks,
  onTrackPress,
  onFavoritePress,
  onOptionsPress,
}: AlbumSongsSectionProps) => {
  return (
    <View style={styles.container}>
      {tracks.map((track, index) => (
        <SongItem
          key={track.id}
          track={track}
          index={index}
          showIndex={true}
          showArtwork={false}
          showArtist={false}
          showFavorite={true}
          showOptions={true}
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
    paddingBottom: 40,
    paddingHorizontal: 10
  },
});

export default AlbumSongsSection;