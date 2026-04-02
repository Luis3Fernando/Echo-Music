import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
interface PlayerArtworkProps {
  artworkUri?: string | null; 
}

const PlayerArtwork = ({ artworkUri }: PlayerArtworkProps) => {
  const imageSource = artworkUri 
    ? { uri: artworkUri } 
    : require("@assets/img/song_default.png");

  return (
    <View style={styles.container}>
      <View style={styles.artworkContainer}>
        <Image 
          source={imageSource} 
          style={styles.bigArt} 
          resizeMode="cover"
          fadeDuration={0} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: -10
  },
  artworkContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  bigArt: {
    width: SCREEN_WIDTH - 30,
    height: SCREEN_WIDTH - 30,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
});

export default PlayerArtwork;