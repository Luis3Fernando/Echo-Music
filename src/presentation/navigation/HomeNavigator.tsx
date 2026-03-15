import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Artist } from "@entities/artist.entity";
import ExploreScreen from "@features/home/screens/ExploreScreen";
import AlbumScreen from "@features/album/screens/AlbumScreen";
import ArtistScreen from "@features/artist/screens/ArtistScreen";

export type SearchStackParamList = {
  Explore: undefined;
  Album: { id: string, albumName: string; artistName: string; artwork?: string };
  Artist: { artist: Artist };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
    <Stack.Screen name="Explore" component={ExploreScreen} />
    <Stack.Screen name="Album" component={AlbumScreen} />
    <Stack.Screen name="Artist" component={ArtistScreen} />
  </Stack.Navigator>
);