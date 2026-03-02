import { Colors } from "@/core/theme/colors";
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BannerProps {
  type: "welcome" | "song" | "action" | "ads";
  data: {
    title: string;
    subtitle?: string;
    image?: any;
    link?: string;
  };
  onPress?: () => void;
}

const Banner = ({ type, data, onPress }: BannerProps) => {
  const isSong = type === "song";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <ImageBackground
        source={data.image || require("@assets/img/banner.jpg")}
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={[styles.overlay, type === "ads" && styles.adsOverlay]}>
          <View style={styles.textContainer}>
            {type === "ads" && <Text style={styles.adsBadge}>AD</Text>}
            <Text style={styles.title}>{data.title}</Text>
            {data.subtitle && (
              <Text style={styles.subtitle}>{data.subtitle}</Text>
            )}
          </View>
          {isSong && (
            <View style={styles.playButton}>
              <Ionicons name="play" size={18} color={Colors.white} />
            </View>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { height: 160, width: "100%", marginVertical: 8 },
  backgroundImage: { flex: 1, justifyContent: "flex-end" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  adsOverlay: { backgroundColor: "rgba(255, 60, 0, 0.2)" },
  textContainer: { flex: 1 },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
  },
  subtitle: { color: "#CCC", fontSize: 13 },
  adsBadge: {
    color: "#FF3C00",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Banner;
