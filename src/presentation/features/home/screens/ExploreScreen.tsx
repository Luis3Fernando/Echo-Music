import { ScrollView, View, StyleSheet } from "react-native";
import { styles } from "../styles/ExploreStyles";
import { useRecommendations } from "@hooks/use-recommendations.hook";
import { useNavigation } from "@react-navigation/native";
import { useHomeAlbums } from "@hooks/use-album.hook";
import ScreenHeader from "@components/organisms/ScreenHeader";
import RecommendedSection from "../components/RecommendedSection";
import QuickActionsSection from "../components/QuickActionsSection";
import AlbumSection from "../components/AlbumSection";
import MostPlayedSection from "../components/MostPlayedSection";
import TopArtistsSection from "../components/TopArtistsSection";
import LibraryStatsSection from "../components/LibraryStatsSection";

const ExploreScreen = () => {
  const navigation = useNavigation<any>();
  const { recommendedTracks } = useRecommendations();
  const { recentAlbums, topCountAlbums, mostLikedAlbums, isLoading } =
    useHomeAlbums();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title="Explorar"
        onActionPress={() => navigation.navigate("Settings")}
      />
      <RecommendedSection data={recommendedTracks} />
      <QuickActionsSection
        onShuffle={() => console.log("[Action] Shuffle All")}
        onPlayFavorites={() => console.log("[Action] Play Favorites")}
        onPlayRecent={() => console.log("[Action] Play Recent")}
        onPlayTop={() => console.log("[Action] Play Most Played")}
      />
      <AlbumSection title="Álbumes recientes" data={recentAlbums} />
      <MostPlayedSection />
      <AlbumSection title="Discos completos" data={topCountAlbums} />
      <AlbumSection title="Tus favoritos" data={mostLikedAlbums} />
      <TopArtistsSection />
      <LibraryStatsSection />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ExploreScreen;
