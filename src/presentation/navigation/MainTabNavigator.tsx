import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@theme/colors";
import { MainTabParamList } from "./types";
import ExploreScreen from "@features/library/screens/ExploreScreen";
import SongsScreen from "@features/library/screens/SongsScreen";
import SearchScreen from "@features/library/screens/SearchScreen";
import LibraryScreen from "@features/library/screens/LibraryScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: "#999",
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 0,
        height: 70,
        paddingBottom: 12,
        elevation: 0,
        borderTopColor: "transparent",
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: "700",
        marginTop: -5,
      },
      tabBarIcon: ({ focused, color }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "musical-notes";

        if (route.name === "Explore") {
          return (
            <Ionicons
              name={focused ? "disc" : "disc-outline"}
              size={24}
              color={color}
            />
          );
        } else if (route.name === "Search") {
          iconName = focused ? "search" : "search-outline";
        } else if (route.name === "Songs") {
          iconName = focused ? "musical-note" : "musical-note-outline";
        } else if (route.name === "Library") {
          iconName = focused ? "library" : "library-outline";
        }

        return <Ionicons name={iconName} size={24} color={color} />;
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
      component={SearchScreen}
      options={{ title: "Buscar" }}
    />
    <Tab.Screen
      name="Songs"
      component={SongsScreen}
      options={{ title: "Canciones" }}
    />
    <Tab.Screen
      name="Library"
      component={LibraryScreen}
      options={{ title: "Biblioteca" }}
    />
  </Tab.Navigator>
);
