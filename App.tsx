import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "@navigation/RootNavigator";
import { navigationRef } from "@navigation/navigation-ref";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { appInitializerService } from "@services/app-initializer.service";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PlayerController } from "@features/player/screens";
import LoadingScreen from "@features/onboarding/screens/LoadingScreen";
import { ToastProvider } from "react-native-toast-notifications";
import { Colors } from "@theme/colors";
import { useAppConfigStore } from "@/presentation/store/use-config.store";
import { SqliteAppSettingsRepository } from "@/infrastructure/repositories/sqlite-app-settings.repository";
import { InitializeAppSettingsUseCase } from "@/application/use-cases/settings/initialize-app-settings.use-case";

const AppContent = () => {
  const db = useSQLiteContext();
  const [isReady, setIsReady] = useState(false);
  const setFullConfig = useAppConfigStore((state) => state.setFullConfig);

  useEffect(() => {
    let mounted = true;
    const initialize = async () => {
      try {
        await appInitializerService.init(db);
        const repo = new SqliteAppSettingsRepository(db);
        const useCase = new InitializeAppSettingsUseCase(repo);
        const savedConfig = await useCase.execute();

        if (mounted) {
          setFullConfig(savedConfig);
          setIsReady(true);
        }
      } catch (e) {
        console.error("Fallo al iniciar AppContent", e);
      }
    };

    initialize();
    return () => {
      mounted = false;
    };
  }, [db, setFullConfig]);

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
        <ToastProvider
          placement="bottom"
          duration={3000}
          animationType="slide-in"
          offsetBottom={100}
          swipeEnabled={true}
          renderType={{
            normal: (toast) => (
              <View style={styles.pillContainer}>
                <Text style={styles.pillText}>{toast.message}</Text>
              </View>
            ),
            success: (toast) => (
              <View
                style={[
                  styles.pillContainer,
                  { borderLeftColor: Colors.success, borderLeftWidth: 4 },
                ]}
              >
                <Text style={styles.pillText}>{toast.message}</Text>
              </View>
            ),
            danger: (toast) => (
              <View
                style={[
                  styles.pillContainer,
                  { borderLeftColor: Colors.error, borderLeftWidth: 4 },
                ]}
              >
                <Text style={styles.pillText}>{toast.message}</Text>
              </View>
            ),
          }}
        >
          <AppContent />
        </ToastProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#2D2D2D",
    borderRadius: 30,
    marginHorizontal: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  pillText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
