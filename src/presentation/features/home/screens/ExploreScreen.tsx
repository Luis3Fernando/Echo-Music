import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "../../library/styles/ExploreStyles";
import { useRecommendations } from "@hooks/use-recommendations.hook";
import RecommendedSection from "../components/RecommendedSection";
import ScreenHeader from "@/presentation/shared/components/organisms/ScreenHeader";
import RecentAlbumsSection from "../components/RecentAlbumsSection";
import MostPlayedSection from "../components/MostPlayedSection";
import TopArtistsSection from "../components/TopArtistsSection";
import LibraryStatsSection from "../components/LibraryStatsSection";
import { useNavigation } from "@react-navigation/native";

const ExploreScreen = () => {
  const { recommendedTracks, loading } = useRecommendations();
  const [isScanning, setIsScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation<any>();
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
        onActionPress={() => navigation.navigate('Settings')}
      />
      <RecommendedSection data={recommendedTracks}></RecommendedSection>
      <RecentAlbumsSection isScanning={isScanning} scanProgress={progress} />
      <MostPlayedSection />
      <TopArtistsSection />
      <LibraryStatsSection />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ExploreScreen;
