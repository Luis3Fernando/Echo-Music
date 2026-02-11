import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@theme/colors';

interface TrackItemProps {
  variant: 'short' | 'standard';
  data: {
    title: string;
    artist: string;
    cover?: any;
  };
  onPress?: () => void;
}

const TrackItem = ({ variant, data, onPress }: TrackItemProps) => {
  const isShort = variant === 'short';

  return (
    <TouchableOpacity 
      style={[styles.container, isShort ? styles.shortContainer : styles.standardContainer]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image 
        source={data.cover?.uri ? { uri: data.cover.uri } : require("@assets/img/default_cover.jpg")} 
        style={isShort ? styles.shortCover : styles.standardCover} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.artist} numberOfLines={1}>{data.artist}</Text>
        <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  shortContainer: {
    width: '50%',
    padding: 8,
    marginBottom: 6,
  },
  standardContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  shortCover: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  standardCover: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  artist: {
    fontSize: 10,
    color: 'gray',
    fontWeight: '500',
  },
  title: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
    marginTop: 1,
  },
});

export default TrackItem;