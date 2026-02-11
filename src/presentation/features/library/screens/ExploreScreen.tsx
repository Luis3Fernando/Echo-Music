import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { styles } from "../styles/ExploreStyles";
import { Colors } from "@theme/colors";
import { useRecommendations } from "@hooks/useRecommendations";
import RecommendedSection from "../components/RecommendedSection";
import ScreenHeader from "@components/organisms/ScreenHeader";
import RecentAlbumsSection from "../components/RecentAlbumsSection";
import MostPlayedSection from "../components/MostPlayedSection";
import TopArtistsSection from "../components/TopArtistsSection";

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
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ marginTop: 50 }}
        />
      ) : (
        <RecommendedSection data={recommendedTracks} />
      )}
      <RecentAlbumsSection isScanning={isScanning} scanProgress={progress} />
      <MostPlayedSection />
      <TopArtistsSection />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ExploreScreen;
