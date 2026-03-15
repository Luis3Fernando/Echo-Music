import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';

const { width } = Dimensions.get('window');

interface AlbumHeaderSectionProps {
  artwork?: string;
  onBackPress: () => void;
}

const AlbumHeaderSection = ({ artwork, onBackPress }: AlbumHeaderSectionProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={artwork ? { uri: artwork } : require("@assets/img/album_default.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBackPress}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width,
    backgroundColor: Colors.light,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:  Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlbumHeaderSection;