import { Colors } from '@/core/theme/colors';
import { usePlayerStore } from '@/presentation/store/use-player.store';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const PlayerInfo = ({ onArtistPress }: { onArtistPress?: () => void }) => {
  const title = usePlayerStore(s => s.currentTrack?.title ?? "Sin título");
  const artistName = usePlayerStore(s => s.currentTrack?.artistName ?? "Artista desconocido");

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.fullTitle} numberOfLines={1}>
        {title}
      </Text>      
      <TouchableOpacity 
        onPress={onArtistPress} 
        activeOpacity={0.7}
      >
        <Text style={styles.fullArtist} numberOfLines={1}>
          {artistName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: { 
    marginTop: 15, 
    width: "100%", 
    alignItems: "center",
    paddingHorizontal: 30 
  },
  fullTitle: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: Colors.white,
    textAlign: 'center' 
  },
  fullArtist: { 
    fontSize: 18, 
    color: "#c2c2c2", 
    marginTop: 6, 
    textAlign: 'center',
    textDecorationLine: 'none'
  },
});

export default PlayerInfo;