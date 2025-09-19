import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { Icon } from "@rneui/base";
import debounce from "lodash.debounce";
import { getGames } from "../services/games";
import { get } from "axios";

const ShelfScreen = () => {
  const [search, setSearch] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const fetchGames = async () => {
    const data = await getGames();
    if (data) setSearchedGame(data);
  };

  //Function Meant for game Search API call
  // const handleGameSearch = useCallback(
  //   //Debounce Used to limit invocation
  //   //Search is passed into a try and catch conditional, await axios API call, and then set setSelectedGame to that response
  //   debounce(async (search) => {
  //     try {
  //       const resp = await axios.get(
  //         `${SERVER_URL}/api/games/search?s=${search}`
  //       );
  //       setSearchedGame(resp.data);
  //       console.log("Search Response:", resp.data);
  //     } catch (err) {
  //       console.log(
  //         "Could Not complete the API Request for Game Search:" + err
  //       );
  //     }
  //   }, 500),
  //   []
  // );

  // const updateSearch = (search) => {
  //   setSearch(search);
  //   handleGameSearch(search);
  // };

  // useEffect(() => {
  //   if (selectedGameId) {
  //     axios
  //       .get(`${SERVER_URL}/api/games/achievements?id=${selectedGameId}`)
  //       .then((response) => {
  //         setGameAchievement(response.data);
  //         console.log("Achievements Response:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching achievements:", error);
  //       });

  //     axios
  //       .get(`${SERVER_URL}/api/games/screenshots?game_pk=${selectedGameId}`)
  //       .then((response) => {
  //         setGameScreenShots(response.data);
  //         console.log("Screenshots Response:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching screenshots:", error);
  //       });
  //   }
  // }, [selectedGameId]);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      style={styles.container}
      behavior="padding"
    >
      <Text style={styles.mainText}>
        In the Search Bar please enter the name of a game you would like to add
        to your shelf.
      </Text>

      {/* <SearchBar
        placeholder="Enter Game Here"
        platform="android"
        searchIcon={null}
        clearIcon={null}
        style={styles.searchBarStyle}
        value={search}
        onChangeText={updateSearch}
      /> */}
      <Button title="Fetch Games" onPress={fetchGames} />
      <FlatList
        data={searchedGame}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <ScrollView
        style={styles.mainView}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {searchedGame.map((game) => (
          <Text key={game.id} style={styles.gameText}>
            {game.name}
          </Text>
        ))}
        {/* {searchedGame && searchedGame.results && (
          <View>
            {searchedGame.results.map((game) => (
              <Text
                key={game.id}
                style={styles.gameText}
                onPress={() => setSelectedGameId(game.id)}
              >
                {game.name}
              </Text>
            ))}
          </View>
        )} */}
      </ScrollView>
    </KeyboardAvoidingView>
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
  gameText: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 5,
    margin: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  searchBarStyle: {
    height: 20,
    borderRadius: 10,
    margin: 5,

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
  },
});
export default ShelfScreen;
