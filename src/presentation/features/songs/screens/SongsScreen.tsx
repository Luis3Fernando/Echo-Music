import React from "react";
import { View, FlatList, StyleSheet, StatusBar, Platform } from "react-native";
import { useLibrary } from "@hooks/use-library.hook";
import SongItem from "@components/atoms/SongItem";
import ScreenHeader from "@/presentation/shared/components/organisms/ScreenHeader";
import SongOptionsSection from "../components/SongOptionsSection";
import { Colors } from "@theme/colors";

export const SongsScreen = () => {
  const { songs, isScanning, scanProgress, totalTracks } = useLibrary();

  const handleShuffle = () => {
    console.log("[Acción] Reproducción aleatoria iniciada");
  };

  const handleSort = (mode: string) => {
    console.log(`[Acción] Cambiando orden a: ${mode}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScreenHeader title="Canciones" showAction={false}/>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <SongOptionsSection
              onShufflePress={handleShuffle}
              onSortChange={handleSort}
            />
          </>
        }
        renderItem={({ item, index }) => (
          <SongItem
            track={item}
            index={index}
            showIndex={false}
            showFavorite={false}
            onPress={(t) => console.log("Play", t.title)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 1,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  listContent: {
    paddingBottom: 40,
  },
});

export default SongsScreen;
