import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "@navigation/RootNavigator";
import { Colors } from "@theme/colors";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { appInitializerService } from "@services/app-initializer.service";

const AppContent = () => {
  const db = useSQLiteContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await appInitializerService.init(db);
      setIsReady(true);
    };

    initialize();
  }, [db]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SQLiteProvider databaseName="echomusic.db" useSuspense={false}>
      <AppContent />
    </SQLiteProvider>
  );
}
