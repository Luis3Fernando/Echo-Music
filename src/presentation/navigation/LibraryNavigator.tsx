import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlaylistScreen from '../features/library/screens/PlaylistScreen';
import FolderScreen from '../features/library/screens/FolderScreen';
import LibraryScreen from '../features/library/screens/LibraryScreen';

export type LibraryStackParamList = {
  LibraryIndex: undefined;
  PlaylistDetail: { id: string; title: string };
  FolderDetail: { name: string; path: string };
};

const Stack = createNativeStackNavigator<LibraryStackParamList>();

export const LibraryNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LibraryIndex" component={LibraryScreen} />
    <Stack.Screen name="PlaylistDetail" component={PlaylistScreen} />
    <Stack.Screen name="FolderDetail" component={FolderScreen} />
  </Stack.Navigator>
);