import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@theme/colors';

interface ArtistCircleProps {
  data: {
    name: string;
    photo?: any;
  };
  onPress?: () => void;
}

const ArtistCircle = ({ data, onPress }: ArtistCircleProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={data.photo?.uri ? { uri: data.photo.uri } : require("@assets/img/artist_default.jpg")} 
          style={styles.photo} 
        />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 15,
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 8,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 2,
    lineHeight: 16,
  },
});

export default ArtistCircle;