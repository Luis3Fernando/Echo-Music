import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Playlist } from "@entities/playlist.entity";
import PlaylistScreen from "@features/library/screens/PlaylistScreen";
import FolderScreen from "@features/library/screens/FolderScreen";
import LibraryScreen from "@features/library/screens/LibraryScreen";
import PlaylistFormScreen from "@features/library/screens/PlaylistFormScreen";
import AlbumScreen from "@features/album/screens/AlbumScreen";

export type LibraryStackParamList = {
  LibraryIndex: undefined;
  Playlist: { id: string; name: string };
  Folder: { name: string; path: string };
  PlaylistForm: { playlist?: Playlist };
  Album: { id: string, albumName: string; artistName: string; artwork?: string };
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export const LibraryNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="LibraryIndex" component={LibraryScreen} />
    <Stack.Screen name="Playlist" component={PlaylistScreen} />
    <Stack.Screen name="Folder" component={FolderScreen} />
    <Stack.Screen name="PlaylistForm" component={PlaylistFormScreen} />
    <Stack.Screen name="Album" component={AlbumScreen} />
  </Stack.Navigator>
);
