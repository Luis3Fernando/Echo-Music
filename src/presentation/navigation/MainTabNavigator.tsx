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
      tabBarActiveTintColor: Colors.white,
      tabBarInactiveTintColor: "#7b7b7b",
      tabBarStyle: {
        backgroundColor: Colors.black,
        borderTopWidth: 0,
        height: 50,
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
        return <Ionicons name={iconName} size={28} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Songs" component={SongsScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />
  </Tab.Navigator>
);
