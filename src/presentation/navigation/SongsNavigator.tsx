import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SongsScreen from "@features/songs/screens/SongsScreen";
import AlbumScreen from "@features/album/screens/AlbumScreen";
import ArtistScreen from "@features/artist/screens/ArtistScreen";

export type SongsStackParamList = {
  SongsIndex: undefined;
  Album: {
    id: string;
    albumName: string;
    artistName: string;
    artwork?: string;
  };
  Artist: { artistId: string; name: string };
};

const Stack = createNativeStackNavigator<SongsStackParamList>();

export const SongsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
    <Stack.Screen name="SongsIndex" component={SongsScreen} />
    <Stack.Screen name="Album" component={AlbumScreen} />
    <Stack.Screen name="Artist" component={ArtistScreen} />
  </Stack.Navigator>
);
