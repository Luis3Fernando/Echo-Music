import React from "react";
import { View, FlatList, Text, StyleSheet, StatusBar, Image } from "react-native";
import { useLibrary } from "@hooks/use-library.hook";

export const SongsScreen = () => {
  const { songs, isScanning, scanProgress, totalTracks } = useLibrary();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {isScanning && (
        <View style={styles.scanBanner}>
          <View style={styles.scanHeader}>
            <Text style={styles.scanTitle}>Sincronizando biblioteca</Text>
            <Text style={styles.scanPercent}>{scanProgress}%</Text>
          </View>
          
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${scanProgress}%` }]}
            />
          </View>

          <Text style={styles.scanCount}>
            {songs.length} de {totalTracks} canciones procesadas
          </Text>
        </View>
      )}

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            {item.artworkUri ? (
              <Image source={{ uri: item.artworkUri }} style={styles.artwork} />
            ) : (
              <View style={styles.artworkPlaceholder}>
                <Text style={styles.placeholderText}>♪</Text>
              </View>
            )}

           <View style={styles.songInfo}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {item.artistName} {item.albumName ? `• ${item.albumName}` : ""}
            </Text>
          </View>
          </View>
        )}
        ListEmptyComponent={
          !isScanning ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay canciones en tu dispositivo</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
export default SongsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  scanBanner: { 
    padding: 16, 
    backgroundColor: "#1db954",
    borderBottomWidth: 1,
    borderBottomColor: "#282828" 
  },
  scanHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  scanTitle: { color: "#fff", fontWeight: "bold" },
  scanPercent: { color: "#fff", fontWeight: "bold" },
  progressBarBackground: { height: 4, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 2 },
  progressBarFill: { height: 4, backgroundColor: "#fff", borderRadius: 2 },
  scanCount: { color: "#fff", fontSize: 10, marginTop: 4, opacity: 0.8 },
  listContent: { paddingVertical: 8 },
  songItem: { flexDirection: "row", padding: 12, alignItems: "center" },
  artwork: { width: 50, height: 50, borderRadius: 4 },
  artworkPlaceholder: { 
    width: 50, 
    height: 50, 
    borderRadius: 4, 
    backgroundColor: "#282828", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  placeholderText: { color: "#b3b3b3", fontSize: 24 },
  songInfo: { marginLeft: 12, flex: 1 },
  title: { color: "#fff", fontSize: 16, fontWeight: "500" },
  artist: { color: "#b3b3b3", fontSize: 14, marginTop: 2 },
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 },
  emptyText: { color: "#b3b3b3" }
});