import React, { useState, useMemo } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "@theme/colors";
import { Track } from "@entities/track.entity";
import { MenuPopover, MenuItem } from "@components/atoms/MenuPopover";
import { useArtistProfile } from "@hooks/use-artist-profile.hook";
import { formatPlaylistDuration } from "@utils/time";
import ArtistHeaderSection from "../components/ArtistHeaderSection";
import ArtistInfoSection from "../components/ArtistInfoSection";
import ArtistSongsSection from "../components/ArtistSongsSection";
import ArtistAlbumsSection from "../components/ArtistAlbumsSection";
import ArtistCollaborationsSection from "../components/ArtistCollaborationsSection";

const ArtistScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { name } = route.params;

  const { artist, tracks, albums, collaborators, isLoading } = useArtistProfile(name);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const totalDuration = useMemo(() => {
    if (!tracks || tracks.length === 0) return "0 min";
    const totalMs = tracks.reduce((acc, t) => acc + t.duration, 0);
    return formatPlaylistDuration(totalMs);
  }, [tracks]);

  const trackMenuItems: MenuItem[] = useMemo(() => [
    {
      label: "Reproducir",
      icon: "play-outline",
      onPress: () => console.log("Play", selectedTrack?.title),
    },
    {
      label: "Añadir a la cola",
      icon: "list-outline",
      onPress: () => console.log("Queue", selectedTrack?.title),
    },
    {
      label: "Añadir a playlist",
      icon: "add-circle-outline",
      onPress: () => console.log("Playlist", selectedTrack?.title),
    },
    {
      label: "Eliminar",
      icon: "trash-outline",
      variant: "danger",
      onPress: () => console.log("Eliminar", selectedTrack?.id),
    },
  ], [selectedTrack]);

  if (isLoading && !artist) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <ArtistHeaderSection
          pictureUrl={artist?.pictureUrl}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.contentCard}>
          <ArtistInfoSection
            name={artist?.name || name}
            songCount={tracks.length}
            duration={totalDuration}
            onPlayPress={() => console.log("Shuffle total")}
            onShufflePress={() => console.log("Shuffle")}
          />
          
          <ArtistSongsSection
            tracks={tracks}
            onTrackPress={(t) => console.log("Play", t.title)}
            onFavoritePress={(t) => console.log("Fav", t.id)}
            onOptionsPress={(event, track) => {
              const { pageX, pageY } = event.nativeEvent;
              setSelectedTrack(track);
              setMenuAnchor({ x: pageX, y: pageY });
              setIsMenuVisible(true);
            }}
          />

          <ArtistAlbumsSection
            albums={albums}
            onAlbumPress={(alb) => navigation.push("Album", { 
              id: alb.id, 
              albumName: alb.title,
              artistName: alb.artistName,
              artwork: alb.artworkUri
            })}
          />

          <ArtistCollaborationsSection
            collaborators={collaborators}
            onArtistPress={(colab) => navigation.push("Artist", { name: colab.name })}
          />
        </View>
      </ScrollView>

      <MenuPopover
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        anchorPosition={menuAnchor}
        items={trackMenuItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  contentCard: {
    backgroundColor: Colors.white,
    marginTop: -50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 0,
    paddingTop: 35,
    paddingBottom: 140,
    minHeight: 600,
    elevation: 20,
  },
});

export default ArtistScreen;