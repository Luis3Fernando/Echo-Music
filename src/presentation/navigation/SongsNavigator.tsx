import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Playlist } from "@entities/playlist.entity";
import SongsScreen from "@features/songs/screens/SongsScreen";
import AlbumScreen from "@features/album/screens/AlbumScreen";
import ArtistScreen from "@features/artist/screens/ArtistScreen";
import PlaylistFormScreen from "@features/library/screens/PlaylistFormScreen";

export type SongsStackParamList = {
  SongsIndex: undefined;
  Album: {
    id: string;
    albumName: string;
    artistName: string;
    artwork?: string;
  };
  Artist: { artistId: string; name: string };
  PlaylistForm: { playlist?: Playlist };
};

const Stack = createNativeStackNavigator<SongsStackParamList>();

export const SongsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SongsIndex" component={SongsScreen} />
    <Stack.Screen name="Album" component={AlbumScreen} />
    <Stack.Screen name="Artist" component={ArtistScreen} />
    <Stack.Screen name="PlaylistForm" component={PlaylistFormScreen} />
  </Stack.Navigator>
);
