import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "@features/search/screens/SearchScreen";
import { Artist } from "@entities/artist.entity";
import AlbumScreen from "../features/album/screens/AlbumScreen";
import ArtistScreen from "../features/artist/screens/ArtistScreen";

export type SearchStackParamList = {
  SearchIndex: undefined;
  Album: {
    id: string;
    albumName: string;
    artistName: string;
    artwork?: string;
  };
  Artist: { artist: Artist };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const SearchNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen name="SearchIndex" component={SearchScreen} />
    <Stack.Screen name="Album" component={AlbumScreen} />
    <Stack.Screen name="Artist" component={ArtistScreen} />
  </Stack.Navigator>
);
