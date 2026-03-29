import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { Spacing } from "@theme/spacing";
import { Playlist } from "@entities/playlist.entity";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_MODAL_HEIGHT = SCREEN_HEIGHT * 0.6;

interface AddToPlaylistModalProps {
  isVisible: boolean;
  playlists: Playlist[];
  onClose: () => void;
  onSelect: (playlist: Playlist) => void;
  onCreateNew: () => void;
}

export const AddToPlaylistModal = ({
  isVisible,
  playlists,
  onClose,
  onSelect,
  onCreateNew,
}: AddToPlaylistModalProps) => {
  const renderItem = ({ item }: { item: Playlist | 'create-new' }) => {
    if (item === 'create-new') {
      return (
        <TouchableOpacity 
          style={styles.playlistItem} 
          onPress={() => {
            onClose();
            onCreateNew();
          }}
        >
          <View style={[styles.artworkContainer, styles.createIconContainer]}>
            <Ionicons name="add" size={28} color={Colors.primary} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.playlistName, { color: Colors.primary }]}>
              Crear nueva playlist
            </Text>
            <Text style={styles.trackCount}>Empieza una lista personalizada</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.playlistItem} 
        onPress={() => onSelect(item)}
      >
        <Image
          source={
            item.artworkUri
              ? { uri: item.artworkUri }
              : require("@assets/img/playlist_default.png")
          }
          style={styles.artworkContainer}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.playlistName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.trackCount}>
            {item.trackCount} {item.trackCount === 1 ? "canción" : "canciones"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const data = ['create-new', ...playlists];

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Añadir a playlist</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.listWrapper}>
            <FlatList
              data={data as any}
              keyExtractor={(item) => (typeof item === 'string' ? item : item.id)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No se encontraron playlists</Text>
                </View>
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    maxHeight: MAX_MODAL_HEIGHT,
    backgroundColor: Colors.white,
    borderRadius: 28,
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
  },
  closeButton: {
    position: "absolute",
    right: Spacing.lg,
    padding: 4,
  },
  listWrapper: {
    flexShrink: 1,
  },
  listContent: {
    padding: Spacing.md,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  artworkContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },
  createIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: "dashed",
  },
  infoContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 2,
  },
  trackCount: {
    fontSize: 13,
    color: "#888",
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    color: "#AAA",
    fontSize: 14,
  },
});