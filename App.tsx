import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "@navigation/RootNavigator";
import { navigationRef } from "@navigation/navigation-ref";
import TrackPlayer from "react-native-track-player";
import { ToastProvider } from "react-native-toast-notifications";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { appInitializerService } from "@services/app-initializer.service";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PlayerController } from "@features/player/screens";
import LoadingScreen from "@features/onboarding/screens/LoadingScreen";
import { Colors } from "@theme/colors";
import { useAppConfigStore } from "@store/use-config.store";
import { usePlayerStore } from "@store/use-player.store";
import { SqliteAppSettingsRepository } from "@repositories/sqlite-app-settings.repository";
import { SqlitePlaybackQueueRepository } from "@repositories/sqlite-playback-queue.repository";
import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";
import { InitializeAppSettingsUseCase } from "@use-cases/settings/initialize-app-settings.use-case";
import { GetQueueArtworksUseCase } from "@use-cases/player/get-queue-artworks.use-case";
import { PlaybackService } from "@services/playback.service";
import { TrackPlayerService } from "@services/track-player.service";

const AppContent = () => {
  const db = useSQLiteContext();
  const [isReady, setIsReady] = useState(false);
  const setFullConfig = useAppConfigStore((state) => state.setFullConfig);
  const { setQueue, setCurrentTrack, setQueueArtworks } = usePlayerStore();

  useEffect(() => {
    let mounted = true;
    const initialize = async () => {
      try {
        await appInitializerService.init(db);

        const playerService = new TrackPlayerService();
        await playerService.setup();

        const settingsRepo = new SqliteAppSettingsRepository(db);
        const settingsUseCase = new InitializeAppSettingsUseCase(settingsRepo);
        const savedConfig = await settingsUseCase.execute();

        const queueRepo = new SqlitePlaybackQueueRepository(db);
        const trackRepo = new SqliteTrackRepository(db);
        const savedQueue = await queueRepo.get();

        if (mounted) {
          setFullConfig(savedConfig);

          if (savedQueue) {
            setQueue(savedQueue);

            const artworksUseCase = new GetQueueArtworksUseCase(trackRepo);
            const artworksMap = await artworksUseCase.execute(
              savedQueue.tracks,
            );
            setQueueArtworks(artworksMap);

            if (savedQueue.currentTrackId) {
              const trackData = await trackRepo.findById(
                savedQueue.currentTrackId,
              );
              setCurrentTrack(trackData);
            }
          }

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
  }, [db, setFullConfig, setQueue, setCurrentTrack, setQueueArtworks]);

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

TrackPlayer.registerPlaybackService(() => PlaybackService);

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
