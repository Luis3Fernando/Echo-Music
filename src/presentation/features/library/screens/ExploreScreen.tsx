import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View, Text } from "react-native";
import { styles } from "../styles/ExploreStyles";
import { Colors } from "@theme/colors";
import { useRecommendations } from "@hooks/use-recommendations.hook";
import RecommendedSection from "../components/RecommendedSection";
import ScreenHeader from "@/presentation/shared/components/organisms/ScreenHeader";
import RecentAlbumsSection from "../components/RecentAlbumsSection";
import MostPlayedSection from "../components/MostPlayedSection";
import TopArtistsSection from "../components/TopArtistsSection";
import LibraryStatsSection from "../components/LibraryStatsSection";

const ExploreScreen = () => {
  const { recommendedTracks, loading } = useRecommendations();
  const [isScanning, setIsScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsScanning(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title="Explorar"
        onActionPress={() => console.log("Abrir Ajustes")}
      />
      <RecommendedSection data={recommendedTracks} />
      <RecentAlbumsSection isScanning={isScanning} scanProgress={progress} />
      <MostPlayedSection />
      <TopArtistsSection />
      <LibraryStatsSection />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ExploreScreen;
