import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaylistScreen from "../features/library/screens/PlaylistScreen";
import FolderScreen from "../features/library/screens/FolderScreen";
import LibraryScreen from "../features/library/screens/LibraryScreen";

export type LibraryStackParamList = {
  LibraryIndex: undefined;
  Playlist: { id: string; title: string };
  Folder: { name: string; path: string };
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export const LibraryNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: "fade",
    }}
  >
    <Stack.Screen name="LibraryIndex" component={LibraryScreen} />
    <Stack.Screen name="Playlist" component={PlaylistScreen} />
    <Stack.Screen name="Folder" component={FolderScreen} />
  </Stack.Navigator>
);
