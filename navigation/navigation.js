import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import DisplayScreen from "../screens/DisplayScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShelfScreen from "../screens/ShelfScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const Tab = createBottomTabNavigator();

const RootTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Shelf" component={ShelfScreen} />
      <Tab.Screen name="Registration" component={RegistrationScreen} />
    </Tab.Navigator>
  );
};

export default RootTab;
