import React, { useState } from "react";
import { StyleSheet, View, FlatList, Platform } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Colors } from "@theme/colors";
import { MOCK_SONGS } from "@mocks/mock-songs";
import { FOLDER_MOCKS } from "@mocks/mock-folder";
import { Track } from "@entities/track.entity";
import { ScreenHeaderBasic } from "@components/molecules/ScreenHeaderBasic";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import { ConfirmDialog } from "@components/organisms/ConfirmDialog";
import FolderHeaderSection from "../components/FolderHeaderSection";
import SongListControls from "../components/SongListControls";
import SongItem from "@components/atoms/SongItem";

const FolderScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { folderId, folderName } = route.params || {};
  const folderData = FOLDER_MOCKS.find((f) => f.id === folderId);

  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [sortMenuAnchor, setSortMenuAnchor] = useState({ x: 0, y: 0 });
  const [currentSort, setCurrentSort] = useState("Por nombre");

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isTrackMenuVisible, setIsTrackMenuVisible] = useState(false);
  const [trackMenuAnchor, setTrackMenuAnchor] = useState({ x: 0, y: 0 });

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const sortOptions: MenuItem[] = [
    {
      label: "Por nombre (A-Z)",
      icon: "text-outline",
      onPress: () => setCurrentSort("Por nombre"),
    },
    {
      label: "Por artista",
      icon: "person-outline",
      onPress: () => setCurrentSort("Por artista"),
    },
    {
      label: "Más recientes",
      icon: "time-outline",
      onPress: () => setCurrentSort("Recientes"),
    },
  ];

  const trackOptions: MenuItem[] = [
    {
      label: "Reproducir",
      icon: "play-outline",
      onPress: () => console.log("Play", selectedTrack?.title),
    },
    {
      label: "Añadir a playlist",
      icon: "add-circle-outline",
      onPress: () => console.log("Add to playlist"),
    },
    {
      label: "Eliminar",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => {
        setConfirmData({
          title: "Eliminar canción",
          description: `¿Deseas eliminar "${selectedTrack?.title}" permanentemente de tu memoria interna?`,
          onConfirm: () => {
            console.log("LOG: Canción eliminada físicamente");
            setIsConfirmVisible(false);
          },
        });
        setIsConfirmVisible(true);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeaderBasic
        title={folderName}
        onBackPress={() => navigation.goBack()}
        variant="light"
      />
      <FlatList
        data={MOCK_SONGS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <FolderHeaderSection
              name={folderName}
              path={folderData?.path || ""}
            />
            <SongListControls
              orderLabel={currentSort}
              onOrderPress={(event) => {
                const { pageX, pageY } = event.nativeEvent;
                setSortMenuAnchor({ x: pageX, y: pageY });
                setIsSortMenuVisible(true);
              }}
              onShufflePress={() => console.log("Shuffle folder")}
              onPlayAllPress={() => console.log("Play folder")}
            />
          </>
        }
        renderItem={({ item }) => (
          <SongItem
            track={item as any}
            showIndex={false}
            showFavorite={false}
            showArtist={true}
            showOptions={true}
            onPress={(t) => console.log("Reproduciendo:", t.title)}
            onOptionsPress={(event, track) => {
              const { pageX, pageY } = event.nativeEvent;
              setTrackMenuAnchor({ x: pageX, y: pageY });
              setSelectedTrack(track);
              setIsTrackMenuVisible(true);
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <MenuPopover
        isVisible={isSortMenuVisible}
        onClose={() => setIsSortMenuVisible(false)}
        items={sortOptions}
        anchorPosition={sortMenuAnchor}
      />
      <MenuPopover
        isVisible={isTrackMenuVisible}
        onClose={() => setIsTrackMenuVisible(false)}
        items={trackOptions}
        anchorPosition={trackMenuAnchor}
      />
      <ConfirmDialog
        isVisible={isConfirmVisible}
        title={confirmData.title}
        description={confirmData.description}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        isDestructive={true}
        onConfirm={confirmData.onConfirm}
        onCancel={() => setIsConfirmVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "android" ? 25 : 10,
  },
  listContent: {
    paddingBottom: 120,
  },
});

export default FolderScreen;