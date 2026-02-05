import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/presentation/navigation/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}