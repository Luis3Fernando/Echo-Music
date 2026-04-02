import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/core/theme/colors';

const AlbumCard = () => {
  const albumData = {
    title: "Libre - En Vivo desde el Estadio Nacional", 
    songCount: 22,
    image: "https://lyricstranslate.com/files/82914828_10157984435019708_6975042466550382592_n.jpg",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.9}
        onPress={() => console.log("Ver Álbum")}
      >
        <Image 
          source={{ uri: albumData.image }} 
          style={styles.albumImage} 
        />        
        <View style={styles.infoContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.label}>Álbum</Text>
            <Text style={styles.albumTitle}>
              {albumData.title}
            </Text>
          </View>          
          <View style={styles.bottomRow}>
            <View style={styles.stats}>
              <Ionicons name="list" size={14} color="rgba(255,255,255,0.5)" />
              <Text style={styles.statsText}>{albumData.songCount} canciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.4)" />
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
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 130,
  },
  albumImage: {
    width: 130,
    height: '100%',
    minHeight: 130,
    backgroundColor: '#222',
    objectFit: 'cover'
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  textWrapper: {
    marginBottom: 10,
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  albumTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
    lineHeight: 24,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statsText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AlbumCard;