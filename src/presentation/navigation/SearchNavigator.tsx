import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "@features/search/screens/SearchScreen";
import AlbumScreen from "@features/album/screens/AlbumScreen";
import ArtistScreen from "@features/artist/screens/ArtistScreen";
import { Playlist } from "@entities/playlist.entity";
import PlaylistFormScreen from "@features/library/screens/PlaylistFormScreen";

export type SearchStackParamList = {
  SearchIndex: undefined;
  Album: {
    id: string;
    albumName: string;
    artistName: string;
    artwork?: string;
  };
  Artist: { artistId: string; name: string };
  PlaylistForm: { playlist?: Playlist };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchIndex" component={SearchScreen} />
    <Stack.Screen name="Album" component={AlbumScreen} />
    <Stack.Screen name="Artist" component={ArtistScreen} />
    <Stack.Screen name="PlaylistForm" component={PlaylistFormScreen} />
  </Stack.Navigator>
);
