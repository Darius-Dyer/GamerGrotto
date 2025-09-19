import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShelfScreen from "../screens/ShelfScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import { useAuth } from "../auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisplayScreen from "../screens/DisplayScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define the bottom tab navigator with Home, Settings, Profile, and Shelf tabs
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
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
const RootNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigation}
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Display" component={DisplayScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigation;
