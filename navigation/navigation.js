import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShelfScreen from "../screens/ShelfScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import * as Icons from "react-native-vector-icons/FontAwesome6";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarLabel: Icons.FontAwesome6IconButton.house }}
    />
    <Tab.Screen name="Settings" component={SettingScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Shelf" component={ShelfScreen} />
  </Tab.Navigator>
);

const RootNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigation;
