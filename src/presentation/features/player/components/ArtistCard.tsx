import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/core/theme/colors';

const ArtistCard = () => {
  const artistData = {
    name: "Gian Marco",
    image: "https://i.scdn.co/image/ab677762000056b81a5cd183700ad34badcef04d",
    songCount: 154,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.9}
        onPress={() => console.log("Ver perfil del artista")}
      >
        <Image 
          source={{ uri: artistData.image }} 
          style={styles.artistBanner} 
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.leftSection}>
            <Text style={styles.label}>Acerca del artista</Text>
            <Text style={styles.artistName}>{artistData.name}</Text>            
            <View style={styles.statsBadge}>
              <Ionicons name="musical-notes" size={12} color="rgba(255,255,255,0.5)" />
              <Text style={styles.statsText}>{artistData.songCount} canciones</Text>
            </View>
          </View>
          <View style={styles.rightSection}>
            <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.3)" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 15,
  },
  card: {
    backgroundColor: Colors.background_dark_light,
    borderRadius: 15,
    overflow: 'hidden',
  },
  artistBanner: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  artistName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  statsText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: '600',
  },
  rightSection: {
    paddingLeft: 10,
  },
});

export default ArtistCard;