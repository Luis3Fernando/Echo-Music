import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { MainTabNavigator } from './MainTabNavigator';
import OnboardingScreen from '@features/onboarding/screens/OnboardingScreen';
import SettingsMenuScreen from '../features/settings/screens/SettingsMenuScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Main" component={MainTabNavigator} />
    <Stack.Screen 
      name="Settings" 
      component={SettingsMenuScreen} 
      options={{ animation: 'slide_from_right' }}
    />
  </Stack.Navigator>
);