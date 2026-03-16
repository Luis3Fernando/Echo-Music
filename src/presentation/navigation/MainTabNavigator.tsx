import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@theme/colors";

import { HomeNavigator } from "./HomeNavigator";
import { SearchNavigator } from "./SearchNavigator";
import { SongsNavigator } from "./SongsNavigator";
import { LibraryNavigator } from "./LibraryNavigator";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: "#4f4f4f",
      tabBarStyle: {
        backgroundColor: Colors.white,
        height: 50,
        position: "absolute",
        bottom: 70,
        left: 0,
        right: 0,
        paddingTop: 5,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
      },
      tabBarIcon: ({ focused, color }) => {
        if (route.name === "ExploreTab") {
          return focused ? (
            <FontAwesome6 name="compact-disc" size={24} color={color} />
          ) : (
            <Ionicons name="disc-outline" size={24} color={color} />
          );
        }
        if (route.name === "SongsTab") {
          return (
            <Ionicons
              name={focused ? "musical-notes" : "musical-notes-outline"}
              size={24}
              color={color}
            />
          );
        }
        if (route.name === "LibraryTab") {
          return (
            <MaterialCommunityIcons
              name={focused ? "music-box-multiple" : "music-box-multiple-outline"}
              size={24}
              color={color}
            />
          );
        }
        if (route.name === "SearchTab") {
          return (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={color}
            />
          );
        }
      },
    })}
  >
    <Tab.Screen name="ExploreTab" component={HomeNavigator} />
    <Tab.Screen name="SearchTab" component={SearchNavigator} />
    <Tab.Screen name="SongsTab" component={SongsNavigator} />
    <Tab.Screen name="LibraryTab" component={LibraryNavigator} />
  </Tab.Navigator>
);