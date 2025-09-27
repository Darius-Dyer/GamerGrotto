import React, { useMemo, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import debounce from "lodash.debounce";
import { useNavigation } from "@react-navigation/native";
import { getGames } from "../services/games";

const SearchScreen = () => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();

  const searchClear = useRef("");

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
      <SearchBar
        placeholder="Search For a Game Here"
        clearIcon={false}
        searchIcon={null}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          searchForGames(text);
        }}
        style={{ textAlign: "center" }}
      />

      <FlatList
        data={searchedGame}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.gameCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Game Details", { id: item.id })
              }
            >
              <Image
                source={{ uri: item.background_image }}
                style={styles.gameImage}
              />
              <Text style={styles.gameText}>{item.name}</Text>
              <Text style={styles.gameText}>Current Rating: {item.rating}</Text>
              <Text style={styles.gameText}>Released on: {item.released}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  gameText: {
    textAlign: "center",
    margin: 1.5,
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  gameCard: {
    marginVertical: 12, // space between items
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gameImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default SearchScreen;
