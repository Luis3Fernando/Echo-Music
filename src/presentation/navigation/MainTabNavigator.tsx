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
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        elevation: 0,
      },
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
      },
      tabBarIcon: ({ focused, color }) => {
        let iconName: keyof typeof Ionicons.glyphMap;
        if (route.name === "Explore") {
          iconName = focused ? "disc" : "disc-outline";
        } else if (route.name === "Search") {
          iconName = focused ? "search" : "search-outline";
        } else if (route.name === "Songs") {
          iconName = focused ? "musical-notes" : "musical-notes-outline";
        } else {
          iconName = focused ? "library" : "library-outline";
        }
        return <Ionicons name={iconName} size={24} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Songs" component={SongsScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />
  </Tab.Navigator>
);
