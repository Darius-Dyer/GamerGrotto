import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { DarkThemeCustom, LightTheme } from "../services/themes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShelfScreen from "../screens/ShelfScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import DisplayScreen from "../screens/DisplayScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define the bottom tab navigator with Home, Settings, Profile, and Shelf tabs
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackground: () => (
          <LinearGradient
            colors={["#36A3CF", "#57C785", "#000000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#d3d3d3",
        tabBarBackground: () => (
          <LinearGradient
            colors={["#36A3CF", "#57C785", "#000000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Shelf" component={ShelfScreen} />
    </Tab.Navigator>
  );
};

// Define the root navigation with a stack navigator
const RootNavigation = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      theme={scheme === "dark" ? DarkThemeCustom : LightTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerBackground: () => (
              <LinearGradient
                colors={["#36A3CF", "#57C785", "#000000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Game Details"
          component={DisplayScreen}
          options={{
            headerBackground: () => (
              <LinearGradient
                colors={["#36A3CF", "#57C785", "#000000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
