import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { MainTabParamList } from "./types";
import { SettingsNavigator } from "./SettingsNavigator";
import ExploreScreen from "@features/library/screens/ExploreScreen";
import SongsScreen from "@features/library/screens/SongsScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textSecondary,
      tabBarStyle: {
        backgroundColor: Colors.white,
        borderTopWidth: 0,
        elevation: 10,
        height: 60,
        paddingBottom: 10,
      },
      tabBarLabelStyle: {
        fontSize: 9,
        fontWeight: "600",
      },
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Explore") {
          return <FontAwesome5 name="compact-disc" size={size} color={color} />;
        }

        let iconName: keyof typeof Ionicons.glyphMap = "musical-notes";

        if (route.name === "Search") {
          iconName = focused ? "search" : "search-outline";
        } else if (route.name === "Songs") {
          iconName = focused ? "musical-notes" : "musical-notes-outline";
        } else if (route.name === "Library") {
          iconName = focused ? "library" : "library-outline";
        } else if (route.name === "SettingsStack") {
          iconName = focused ? "settings" : "settings-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{ title: "Explorar" }}
    />
    <Tab.Screen
      name="Search"
      component={ExploreScreen} 
      options={{ title: "Buscar" }}
    />
    <Tab.Screen
      name="Songs"
      component={SongsScreen}
      options={{ title: "Canciones" }}
    />
    <Tab.Screen
      name="Library"
      component={ExploreScreen} 
      options={{ title: "Biblioteca" }}
    />
    <Tab.Screen
      name="SettingsStack"
      component={SettingsNavigator}
      options={{ title: "Ajustes" }}
    />
  </Tab.Navigator>
);