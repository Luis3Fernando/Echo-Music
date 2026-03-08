import { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "@navigation/RootNavigator";
import { navigationRef } from '@navigation/navigation-ref';
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { appInitializerService } from "@services/app-initializer.service";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PlayerController } from "@components/organisms/player-controller";
import LoadingScreen from "@features/onboarding/screens/LoadingScreen";

const AppContent = () => {
  const db = useSQLiteContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const initialize = async () => {
      try {
        await appInitializerService.init(db);
        if (mounted) setIsReady(true);
      } catch (e) {
        console.error("Fallo al iniciar DB", e);
      }
    };
    initialize();
    return () => { mounted = false; };
  }, [db]);

  if (!isReady) return <LoadingScreen />;

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
      <PlayerController />
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="echomusic.db" useSuspense={false}>
        <AppContent />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}