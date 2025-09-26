import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SavedGamesScreen from "./SavedGamesScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import SearchScreen from "./SearchScreen";
const ShelfScreen = () => {
  const Tabs = createMaterialTopTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#121212" },
      }}
    >
      <Tabs.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="search" size={24} color="#fff" />
          ),
          tabBarLabelStyle: {
            color: "#fff",
          },
        }}
      />
      <Tabs.Screen
        name="My Shelf"
        component={SavedGamesScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="save" size={24} color="#fff" />,
          tabBarLabelStyle: {
            color: "#fff",
          },
        }}
      />
    </Tabs.Navigator>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#121212",
  },
});

export default ShelfScreen;
