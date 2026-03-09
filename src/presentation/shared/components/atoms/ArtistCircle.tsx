import React, { useState, useEffect } from "react";
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
  data: {
    name: string;
  };
  onPress?: () => void;
}

const ArtistCircle = ({ data, onPress }: ArtistCircleProps) => {
  const { fetchArtist, loading: apiLoading } = useArtist();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const skeletonValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonValue, {
          toValue: 1,
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
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchArtist(data.name).then((result) => {
      if (isMounted) setArtist(result);
    });
    return () => {
      isMounted = false;
    };
  }, [data.name, fetchArtist]);

  const isCurrentlyLoading = apiLoading || !imageLoaded;

  const skeletonOpacity = skeletonValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {isCurrentlyLoading && (
          <Animated.View
            style={[styles.skeleton, { opacity: skeletonOpacity }]}
          />
        )}
        <Image
          source={
            artist?.pictureUrl
              ? { uri: artist.pictureUrl }
              : require("@assets/img/artist_default.jpg")
          }
          style={[styles.photo, !imageLoaded && { width: 0, height: 0 }]}
          onLoad={() => setImageLoaded(true)}
        />
      </View>
      {apiLoading ? (
        <Animated.View
          style={[styles.skeletonText, { opacity: skeletonOpacity }]}
        />
      ) : (
        <Text style={styles.name} numberOfLines={2}>
          {data.name}
        </Text>
      )}
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
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    backgroundColor: "#E1E9EE",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  skeleton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#ADB5BD",
    borderRadius: 45,
  },
  skeletonText: {
    width: 60,
    height: 10,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginTop: 4,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 12,
    color: Colors.black,
    textAlign: "center",
    paddingHorizontal: 2,
    lineHeight: 14,
  },
});

export default ArtistCircle;
