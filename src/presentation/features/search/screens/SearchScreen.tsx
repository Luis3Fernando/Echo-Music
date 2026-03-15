import { useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, Platform } from "react-native";
import { Colors } from "@theme/colors";
import { SearchInput } from "@/presentation/shared/components/molecules/SearchInput";
import ScreenHeader from "@/presentation/shared/components/organisms/ScreenHeader";
import DiscoverySection from "../components/DiscoverySection";
import LoadingSection from "../components/LoadingSection";
import ResultsSection from "../components/ResultsSection";
import EmptySection from "../components/EmptySection";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (text.toLowerCase().includes("abc")) {
          setResults([
            {
              id: "1",
              title: "Abc (feat. Nightly)",
              artistName: "The 502s",
              artworkUri: null,
            },
            {
              id: "2",
              title: "Alphabet Song",
              artistName: "Kids Music",
              artworkUri: null,
            },
            {
              id: "3",
              title: "ABC de Amor",
              artistName: "Salsa Class",
              artworkUri: null,
            },
          ]);
        } else {
          setResults([]);
        }
      }, 400);
    } else {
      setIsLoading(false);
      setResults([]);
    }
  };

  const renderContent = () => {
    if (searchQuery.length === 0) return <DiscoverySection />;
    if (isLoading) return <LoadingSection />;
    if (results.length === 0) return <EmptySection query={searchQuery} />;
    return (
      <ResultsSection
        results={results}
        onTrackPress={(t) => console.log("Play", t.title)}
        onTrackOptionsPress={(e, t) => console.log("Opciones de", t.title)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Descubrir" showAction={false} />
      <SearchInput
        value={searchQuery}
        onChangeText={handleTextChange}
        onClear={() => handleTextChange("")}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  resultsContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 15,
    marginLeft: 5,
  },
});

export default SearchScreen;
