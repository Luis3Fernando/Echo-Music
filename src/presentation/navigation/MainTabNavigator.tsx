import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types'; 
import { SettingsNavigator } from './SettingsNavigator';
import ExploreScreen from '../features/library/screens/ExploreScreen';
import SongsScreen from '../features/library/screens/SongsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen 
      name="Explore" 
      component={ExploreScreen} 
      options={{ title: 'Inicio' }} 
    />
    <Tab.Screen 
      name="Songs" 
      component={SongsScreen} 
      options={{ title: 'Canciones' }} 
    />
    <Tab.Screen 
      name="SettingsStack" 
      component={SettingsNavigator} 
      options={{ title: 'Ajustes' }}
    /> 
  </Tab.Navigator>
);