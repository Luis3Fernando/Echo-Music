import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList } from './types';
import AboutScreen from '../features/settings/screens/AboutScreen';
import AppearanceScreen from '../features/settings/screens/AppearanceScreen';
import SettingsMenuScreen from '../features/settings/screens/SettingsMenuScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsNavigator = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerTitle: 'Configuración', 
      headerStyle: { backgroundColor: '#0F0F0F' },
      headerTintColor: '#FFF'
    }}
  >
    <Stack.Screen 
      name="SettingsMenu" 
      component={SettingsMenuScreen} 
      options={{ title: 'Menú Principal' }} 
    />
    <Stack.Screen 
      name="Appearance" 
      component={AppearanceScreen} 
      options={{ title: 'Personalización' }} 
    />
    <Stack.Screen 
      name="About" 
      component={AboutScreen} 
      options={{ title: 'Sobre la App' }} 
    />
  </Stack.Navigator>
);