import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
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
        elevation: 0,
        paddingTop: 5,
        borderTopWidth: 0,
      },
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
      },
      tabBarIcon: ({ focused, color }) => {
        if (route.name === "Explore") {
          return focused ? (
            <FontAwesome6 name="compact-disc" size={24} color={color} />
          ) : (
            <Ionicons name="disc-outline" size={24} color={color} />
          );
        }

        if (route.name === "Songs") {
          return (
            <Ionicons
              name={focused ? "musical-notes" : "musical-notes-outline"}
              size={24}
              color={color}
            />
          );
        }

        if (route.name === "Library") {
          return (
            <MaterialCommunityIcons
              name={focused ? "music-box-multiple" : "music-box-multiple-outline"}
              size={24}
              color={color}
            />
          );
        }

        if (route.name === "Search") {
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
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Songs" component={SongsScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />
  </Tab.Navigator>
);