import React, { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import debounce from "lodash.debounce";
import { useNavigation } from "@react-navigation/native";
import { getGames } from "../services/games";

const SearchScreen = () => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);

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
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      style={styles.container}
      behavior="padding"
    >
      {/* <Text style={styles.mainText}>
        In the Search Bar please enter the name of a game you would like to add
        to your shelf.
      </Text> */}

      {/* <SearchBar
        placeholder="Enter Game Here"
        platform="android"
        searchIcon={null}
        clearIcon={null}
        style={styles.searchBarStyle}
        value={search}
        onChangeText={updateSearch}
      /> */}
      <SearchBar
        placeholder="Search For a Game Here"
        clearIcon={false}
        searchIcon={null}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          searchForGames(text);
        }}
      />

      <FlatList
        data={searchedGame}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
            style={styles.gameContainer}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Game Details", { id: item.id })
              }
            >
              <Image
                source={{ uri: item.background_image }}
                style={{
                  width: width * 0.9,
                  height: width * 0.5,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
              <Text style={styles.gameText}>{item.name}</Text>
              <Text style={styles.gameText}>Current Rating: {item.rating}</Text>
              <Text style={styles.gameText}>Released on: {item.released}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  gameText: {
    textAlign: "center",
    margin: 1.5,
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default SearchScreen;
