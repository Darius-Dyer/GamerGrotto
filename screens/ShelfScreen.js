import {
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useMemo, useState } from "react";
import { SearchBar } from "@rneui/themed";
import debounce from "lodash.debounce";
import { useNavigation } from "@react-navigation/native";
import { getGames } from "../services/games";
import { useAuth } from "../auth/AuthContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SavedGamesScreen from "./SavedGamesScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import SearchScreen from "./SearchScreen";
const ShelfScreen = () => {
  const Tabs = createMaterialTopTabNavigator();

  const { checkSavedGames } = useAuth();
  const { width } = Dimensions.get("window");

  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);

  const fetchGames = async () => {
    const data = await getGames();
    if (data) setSearchedGame(data);
  };

  const searchForGames = useMemo(
    () =>
      debounce(async (text) => {
        try {
          const data = await getGames(text);
          setSearchedGame(data);
        } catch (error) {
          console.log("Error With Search: " + error);
        }
      }, 2000),
    []
  );

  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="My Shelf" component={SavedGamesScreen} />
    </Tabs.Navigator>
    // <KeyboardAvoidingView
    //   contentContainerStyle={{ flex: 1 }}
    //   style={styles.container}
    //   behavior="padding"
    // >
    //   {/* <Text style={styles.mainText}>
    //     In the Search Bar please enter the name of a game you would like to add
    //     to your shelf.
    //   </Text> */}

    //   {/* <SearchBar
    //     placeholder="Enter Game Here"
    //     platform="android"
    //     searchIcon={null}
    //     clearIcon={null}
    //     style={styles.searchBarStyle}
    //     value={search}
    //     onChangeText={updateSearch}
    //   /> */}
    //   <SearchBar
    //     placeholder="Search For a Game Here"
    //     clearIcon={false}
    //     searchIcon={null}
    //     value={search}
    //     onChangeText={(text) => {
    //       setSearch(text);
    //       searchForGames(text);
    //     }}
    //   />
    //   {/* <Button title="Fetch Games" onPress={fetchGames} /> */}
    //   <FlatList
    //     data={searchedGame}
    //     keyExtractor={(item) => item.id.toString()}
    //     renderItem={({ item }) => (
    //       <ScrollView
    //         contentContainerStyle={{
    //           flexGrow: 1,
    //           justifyContent: "center",
    //           alignContent: "center",
    //           alignSelf: "center",
    //         }}
    //         style={styles.gameContainer}
    //       >
    //         <TouchableOpacity
    //           onPress={() =>
    //             navigation.navigate("Game Details", { id: item.id })
    //           }
    //         >
    //           <Image
    //             source={{ uri: item.background_image }}
    //             style={{
    //               width: width * 0.9,
    //               height: width * 0.5,
    //               resizeMode: "contain",
    //               alignSelf: "center",
    //             }}
    //           />
    //           <Text style={styles.gameText}>{item.name}</Text>
    //           <Text style={styles.gameText}>Current Rating: {item.rating}</Text>
    //           <Text style={styles.gameText}>Released on: {item.released}</Text>
    //         </TouchableOpacity>
    //       </ScrollView>
    //     )}
    //   />
    //   <ScrollView
    //     style={styles.mainView}
    //     contentContainerStyle={{
    //       flexGrow: 1,
    //       justifyContent: "center",
    //       alignContent: "center",
    //     }}
    //   ></ScrollView>
    // </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    centerItems: "center",
    justifyContent: "center",
  },
  mainView: {
    backgroundColor: "#ADD8E6",
  },
  titleText: {
    textAlign: "center",
    margin: 5,
    fontSize: 30,
  },
  mainText: {
    textAlign: "center",
    margin: 5,
    fontSize: 17,
    fontWeight: "bold",
  },
  gameContainer: {
    margin: 15,
    borderColor: "black",
    border: 10,
    borderWidth: 2.5,
    backgroundColor: "#D3D3D3",
  },
  gameText: {
    textAlign: "center",
    margin: 1.5,
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
  gameImage: {
    alignSelf: "center",
    resizeMode: "contain",
  },
  searchBarStyle: {
    height: 20,
    borderRadius: 10,
    margin: 5,
  },
  backgroundColor: "#ADD8E6",
  width: 250,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  padding: 10,
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
});
export default ShelfScreen;
