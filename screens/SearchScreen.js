import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const SearchScreen = () => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();

  const searchClear = useRef("");

  const [search, setSearch] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const searchForGames = useCallback(
    debounce(async (text) => {
      setSearch(text);
      setPage(1);
      setIsLoading(true);
      try {
        const data = await getGames(text, 1);
        setSearchedGame(data.results);
        setHasMore(data.next !== null);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // const searchForGames = useMemo(
  //   () =>
  //     debounce(async (text) => {
  //       setPage(1);
  //       setIsLoading(true);
  //       try {
  //         const data = await getGames(text, 1);
  //         setSearchedGame(data);
  //         if (data.results >= 20) {
  //           setHasMore(true);
  //         }
  //       } catch (error) {
  //         console.log("Error With Search: " + error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }, 2000),
  //   []
  // );

  const loadMoreGames = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const data = await getGames(search, nextPage);
      setSearchedGame((prevGames) => [...prevGames, ...data.results]);
      setPage(nextPage);
      setHasMore(data.next !== null);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/*
        If no games are found and not loading, show prompt to enter a game title.
        */}
      {searchedGame.length === 0 && !isLoading && (
        <View
          style={{
            alignContent: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: 20,
              fontSize: 20,
            }}
          >
            No Games match your search.
            {"\n"}
            Please enter a game title to search for games in the database.
          </Text>
        </View>
      )}
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          margin: 10,
          fontSize: 20,
        }}
      >
        {searchedGame.length} Results for "{search}"
      </Text>
      {isLoading ? (
        <>
          <ActivityIndicator
            color={"green"}
            size={50}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: 10,
              fontSize: 20,
            }}
          >
            Searching for {"\n"}
            {search}"...
          </Text>
        </>
      ) : (
        <>
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
                  <Text style={styles.gameText}>
                    Current Rating: {item.rating}
                  </Text>
                  <Text style={styles.gameText}>
                    Released on: {item.released}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {!isLoading && hasMore && (
        <TouchableOpacity
          onPress={() => {
            setPage((prevPage) => prevPage + 1);
            loadMoreGames();
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: 10,
              fontSize: 20,
            }}
          >
            {searchedGame.length} Results for "{search}" Load next Page?
          </Text>
        </TouchableOpacity>
      )}
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
