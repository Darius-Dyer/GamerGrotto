import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import DisplayScreen from "../screens/DisplayScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShelfScreen from "../screens/ShelfScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NativeStackNavigation = () => {
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Registration" component={RegistrationScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>;
};

const BottomTabNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Shelf" component={ShelfScreen} />
    <Tab.Screen name="Display" component={DisplayScreen} />
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
