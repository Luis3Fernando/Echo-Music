import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecommendations } from "@hooks/use-recommendations.hook";
import { useHomeAlbums } from "@hooks/use-album.hook";
import { useHomeArtists } from "@hooks/use-artist.hook";
import { useTrack } from "@hooks/use-track.hook";
import { Track } from "@entities/track.entity";
import { styles } from "../styles/ExploreStyles";
import ScreenHeader from "@components/organisms/ScreenHeader";
import RecommendedSection from "../components/RecommendedSection";
import QuickActionsSection from "../components/QuickActionsSection";
import AlbumSection from "../components/AlbumSection";
import ArtistSection from "../components/ArtistSection";
import MostPlayedSection from "../components/MostPlayedSection";
import LibraryStatsSection from "../components/LibraryStatsSection";

const ExploreScreen = () => {
  const navigation = useNavigation<any>();
  const [mostPlayed, setMostPlayed] = useState<Track[]>([]);
  const { recommendedTracks } = useRecommendations();
  const { recentAlbums, topCountAlbums, mostLikedAlbums } = useHomeAlbums();
  const { topTrackArtists, likedArtists, topPlayedArtists } = useHomeArtists();
  const { getMostPlayedTracks } = useTrack();

  useEffect(() => {
    const loadTopTracks = async () => {
      const tracks = await getMostPlayedTracks(8);
      setMostPlayed(tracks);
    };
    loadTopTracks();
  }, [getMostPlayedTracks]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title="Explorar"
        onActionPress={() => navigation.navigate("Settings")}
      />
      <RecommendedSection data={recommendedTracks} />
      <QuickActionsSection
        onShuffle={() => console.log("Shuffle")}
        onPlayFavorites={() => console.log("Favorites")}
        onPlayRecent={() => console.log("Recent")}
        onPlayTop={() => console.log("Top")}
      />
      <AlbumSection title="Álbumes recientes" data={recentAlbums} />
      <MostPlayedSection data={mostPlayed} />
      <ArtistSection title="Artistas con más música" data={topTrackArtists} />
      <AlbumSection title="Discos completos" data={topCountAlbums} />
      <ArtistSection title="Tus artistas favoritos" data={likedArtists} />
      <AlbumSection title="Álbumes que te encantan" data={mostLikedAlbums} />
      <ArtistSection title="Los más escuchados" data={topPlayedArtists} />
      <LibraryStatsSection /> 
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ExploreScreen;