import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/ExploreStyles";
import RecommendedSection from "@components/organisms/RecommendedSection";
import { Colors } from "@theme/colors";
import { useRecommendations } from "@/logic/hooks/useRecommendations";
import ScreenHeader from "@components/organisms/ScreenHeader";

const ExploreScreen = () => {
  const { recommendedTracks, loading } = useRecommendations();

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
    </ScrollView>
  );
};

export default ExploreScreen;
