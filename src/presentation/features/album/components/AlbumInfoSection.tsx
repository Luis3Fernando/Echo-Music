import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';

interface AlbumInfoSectionProps {
  title: string;
  artistName: string;
  songCount: number;
  duration: string;
  onPlayPress: () => void;
}

const AlbumInfoSection = ({ 
  title, 
  artistName, 
  songCount, 
  duration, 
  onPlayPress 
}: AlbumInfoSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.artists}>{artistName}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="musical-notes-outline" size={14} color={Colors.gray_text} />
            <Text style={styles.metaText}>{songCount} canciones</Text>
          </View>
          <View style={styles.dot} />
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={Colors.gray_text} />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={onPlayPress}
        activeOpacity={0.8}
      >
        <Ionicons name="play" size={30} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  artists: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: Colors.gray_text,
    fontWeight: '500',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.gray_light,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default AlbumInfoSection;