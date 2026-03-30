import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Colors } from "@theme/colors";
import { useArtist } from "@hooks/use-artist.hook";
import { Artist } from "@entities/artist.entity";

interface ArtistCircleProps {
  data: { name: string };
  onPress?: () => void;
}

const ArtistCircle = ({ data, onPress }: ArtistCircleProps) => {
  const { fetchArtist } = useArtist();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const skeletonValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonValue, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(skeletonValue, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [skeletonValue]);

  useEffect(() => {
    let isMounted = true;
    fetchArtist(data.name).then((result) => {
      if (isMounted && result) setArtist(result);
    });
    return () => {
      isMounted = false;
    };
  }, [data.name, fetchArtist]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {!imageLoaded && (
          <Animated.View
            style={[styles.skeleton, { opacity: skeletonValue }]}
          />
        )}

        <Image
          source={
            artist?.pictureUrl
              ? { uri: artist.pictureUrl }
              : require("@assets/img/artist_default.png")
          }
          style={styles.photo}
          onLoad={() => setImageLoaded(true)}
        />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {artist?.name || data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 10,
    alignItems: "center",
  },
  imageContainer: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    overflow: "hidden",
    backgroundColor: "#E1E9EE",
    marginBottom: 8,
    position: "relative",
  },
  skeleton: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ADB5BD",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 12,
    fontFamily: "Jakarta-Medium",
    color: Colors.black,
    textAlign: "center",
    paddingHorizontal: 4,
    lineHeight: 14,
  },
});

export default ArtistCircle;
