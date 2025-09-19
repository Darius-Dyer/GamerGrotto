import {
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useMemo, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { Icon } from "@rneui/base";
import debounce from "lodash.debounce";
import { getGames } from "../services/games";

const ShelfScreen = () => {
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
      {/* <Button title="Fetch Games" onPress={fetchGames} /> */}
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
            <TouchableOpacity>
              <Image
                source={{ uri: item.background_image }}
                style={styles.gameImage}
              />
              <Text style={styles.gameText}>
                {item.name}
                {"\n"}
              </Text>
              <Text style={styles.gameText}>
                {`Rating: ${item.rating} from ${item.ratings_count} votes. ${
                  item.rating < 2
                    ? "This game is not reviewed favourably."
                    : "This game is reviewed favourably."
                }`}
              </Text>
              {"\n"}
              <Text style={styles.gameText}>Released on: {item.released}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
      <ScrollView
        style={styles.mainView}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      ></ScrollView>
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
    width: 250,
    height: 250,
    alignSelf: "center",
    margin: 10,
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
