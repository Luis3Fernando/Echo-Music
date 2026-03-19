import { Colors } from '@/core/theme/colors';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface PlayerInfoProps {
  title: string;
  artistName: string;
  onArtistPress?: () => void;
}

const PlayerInfo = ({ title, artistName, onArtistPress }: PlayerInfoProps) => {
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