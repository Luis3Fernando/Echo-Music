import React from "react";

import { View, FlatList, Text, StyleSheet, StatusBar, Image } from "react-native";

import { useLibrary } from "@/logic/hooks/useLibrary";

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
                {item.artist || "Artista desconocido"} {item.album ? `• ${item.album}` : ""}
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
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    paddingTop: 30,
  },
  listContent: {
    paddingBottom: 100, // Espacio para un futuro mini-reproductor
  },
  // Banner de Escaneo
  scanBanner: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    margin: 12,
    borderRadius: 12,
    elevation: 4,
  },
  scanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scanTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  scanPercent: {
    color: "#1DB954", // Verde acento
    fontWeight: "bold",
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#1DB954",
  },
  scanCount: {
    color: "#b3b3b3",
    fontSize: 11,
    marginTop: 8,
    textAlign: "right",
  },
  // Items de la Lista
  songItem: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: "#333",
  },
  artworkPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: "#282828",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#535353",
    fontSize: 24,
  },
  songInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  artist: {
    color: "#b3b3b3",
    fontSize: 13,
  },
  // Empty State
  emptyState: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    color: "#535353",
    fontSize: 16,
  },
});