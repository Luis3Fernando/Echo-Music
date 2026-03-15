import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Colors } from "@theme/colors";
import { Ionicons } from "@expo/vector-icons";
import SongItem from "@components/atoms/SongItem";
import ArtistCircle from "@components/atoms/ArtistCircle";
import AlbumCard from "@components/atoms/AlbumCard";
import SectionTitle from "@components/atoms/SectionTitle";
import { Track } from "@entities/track.entity";
import { Artist } from "@entities/artist.entity";

interface ResultsSectionProps {
  tracks?: Track[];
  artists?: Artist[];
  albums?: { title: string; artist: string; artwork?: string }[];
  onTrackPress: (track: Track) => void;
  onTrackOptionsPress: (event: any, track: Track) => void;
  onArtistPress: (artist: Artist) => void;
  onAlbumPress: (albumName: string, artistName: string) => void;
}

interface ResultsSectionProps {
  tracks?: Track[];
  artists?: Artist[];
  albums?: { title: string; artist: string; artwork?: string }[];
  onTrackPress: (track: Track) => void;
  onTrackOptionsPress: (event: any, track: Track) => void;
  onFavoritePress: (track: Track) => void;
  onArtistPress: (artist: Artist) => void;
  onAlbumPress: (albumName: string, artistName: string) => void;
}

const ResultsSection = ({
  tracks = [],
  artists = [],
  albums = [],
  onTrackPress,
  onTrackOptionsPress,
  onFavoritePress,
  onArtistPress,
  onAlbumPress,
}: ResultsSectionProps) => {
  const [showAllTracks, setShowAllTracks] = useState(false);
  const safeTracks = tracks ?? [];
  const displayedTracks = showAllTracks ? safeTracks : safeTracks.slice(0, 5);
  const hasMoreTracks = safeTracks.length > 5;

  return (
    <View style={styles.container}>
      {safeTracks.length > 0 && (
        <View style={styles.section}>
          <SectionTitle title="Resultados" />
          {displayedTracks.map((item) => (
            <SongItem
              key={item.id}
              track={item}
              showFavorite={true}
              onPress={onTrackPress}
              onOptionsPress={onTrackOptionsPress}
              onFavoritePress={() => onFavoritePress(item)}
            />
          ))}
          {hasMoreTracks && (
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => setShowAllTracks(!showAllTracks)}
            >
              <Text style={styles.viewMoreText}>
                {showAllTracks ? "Ver menos" : "Ver todo"}
              </Text>
              <Ionicons
                name={showAllTracks ? "chevron-up" : "chevron-down"}
                size={16}
                color={Colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {(artists ?? []).length > 0 && (
        <View style={styles.section}>
          <SectionTitle title="Artistas" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalPadding}
          >
            {artists.map((item) => (
              <ArtistCircle
                key={item.id}
                data={{ name: item.name }}
                onPress={() => onArtistPress(item)}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {(albums ?? []).length > 0 && (
        <View style={styles.section}>
          <SectionTitle title="Álbumes" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalPadding}
          >
            {albums.map((item, index) => (
              <AlbumCard
                key={index}
                type="album"
                data={{
                  title: item.title,
                  artist: item.artist,
                  cover: item.artwork ? { uri: item.artwork } : null,
                }}
                onPress={() => onAlbumPress(item.title, item.artist)}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  section: { marginBottom: 0 },
  horizontalPadding: { paddingHorizontal: 15, gap: 10, marginTop: 10 },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 0,
    gap: 5,
  },
  viewMoreText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});

export default ResultsSection;
