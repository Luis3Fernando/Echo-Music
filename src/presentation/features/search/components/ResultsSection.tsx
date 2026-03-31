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
import { Album } from "@entities/album.entity";

interface ResultsSectionProps {
  tracks?: Track[];
  artists?: Artist[];
  albums?: Album[];
  onTrackPress: (track: Track) => void;
  onTrackOptionsPress: (event: any, track: Track) => void;
  onFavoritePress: (track: Track) => void;
  onArtistPress: (artist: Artist) => void;
  onAlbumPress: (album: Album) => void;
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
  const safeArtists = artists ?? [];
  const safeAlbums = albums ?? [];

  const displayedTracks = showAllTracks ? safeTracks : safeTracks.slice(0, 5);
  const hasMoreTracks = safeTracks.length > 5;

  return (
    <View style={styles.container}>
      {safeTracks.length > 0 && (
        <View style={styles.section}>
          <SectionTitle title="Canciones" />
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
                {showAllTracks ? "Ver menos" : `Ver todas (${safeTracks.length})`}
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
      {safeArtists.length > 0 && (
        <View style={styles.section}>
          <SectionTitle title="Artistas" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalPadding}
          >
            {safeArtists.map((item) => (
              <ArtistCircle
                key={item.id}
                data={{ 
                  name: item.name,
                }}
                onPress={() => onArtistPress(item)}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {safeAlbums.length > 0 && (
        <View style={styles.section}>
          <SectionTitle title="Álbumes" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalPadding}
          >
            {safeAlbums.map((item) => (
              <AlbumCard
                key={item.id}
                type="album"
                data={{
                  title: item.title,
                  artist: item.artistName,
                  cover: item.artworkUri ? { uri: item.artworkUri } : null,
                }}
                onPress={() => onAlbumPress(item)}
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
  section: { marginBottom: 20 },
  horizontalPadding: { paddingHorizontal: 15, gap: 15, marginTop: 10 },
  viewMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 5,
  },
  viewMoreText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});

export default ResultsSection;