import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useRecommendations } from "@hooks/use-recommendations.hook";
import { useHomeAlbums } from "@hooks/use-album.hook";
import { useHomeArtists } from "@hooks/use-artist.hook";
import { useTrack } from "@hooks/use-track.hook";
import { usePlayerActions } from "@/presentation/shared/hooks/use-player-actions.hook";
import { SqlitePlaylistRepository } from "@repositories/sqlite-playlist.repository";
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
  const db = useSQLiteContext();
  const navigation = useNavigation<any>();
  const [mostPlayed, setMostPlayed] = useState<Track[]>([]);
  
  const { recommendedTracks } = useRecommendations();
  const { recentAlbums, topCountAlbums, mostLikedAlbums } = useHomeAlbums();
  const { topTrackArtists, likedArtists, topPlayedArtists } = useHomeArtists();
  
  const { getMostPlayedTracks, findAll } = useTrack();
  const { playList } = usePlayerActions();

  useEffect(() => {
    const loadTopTracks = async () => {
      const tracks = await getMostPlayedTracks(8);
      setMostPlayed(tracks);
    };
    loadTopTracks();
  }, [getMostPlayedTracks]);

  const handleShuffleAll = async () => {
    const allTracks = await findAll();
    if (allTracks.length > 0) {
      const ids = allTracks.map(t => t.id);
      playList(ids, 0, true);
    }
  };

  const handlePlayFavorites = async () => {
    const playlistRepo = new SqlitePlaylistRepository(db);
    const favTracks = await playlistRepo.getTracksByPlaylistId("playlist-favorites", "date_added_desc");
    if (favTracks.length > 0) {
      const ids = favTracks.map(t => t.id);
      playList(ids, 0, false);
    }
  };

  const handlePlayRecent = async () => {
    const recentTracks = await findAll("date_added_desc");
    if (recentTracks.length > 0) {
      const ids = recentTracks.map(t => t.id);
      playList(ids, 0, false);
    }
  };

  const handlePlayTop = async () => {
    const topTracks = await getMostPlayedTracks(50);
    if (topTracks.length > 0) {
      const ids = topTracks.map(t => t.id);
      playList(ids, 0, false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title="Explorar"
        onActionPress={() => navigation.navigate("Settings")}
      />
      <RecommendedSection data={recommendedTracks} />
      <QuickActionsSection
        onShuffle={handleShuffleAll}
        onPlayFavorites={handlePlayFavorites}
        onPlayRecent={handlePlayRecent}
        onPlayTop={handlePlayTop}
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