import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getGameDetails,
  getGameAchievements,
  getGameScreenshots,
} from "../services/games";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import AchievementSection from "../components/AchievementSection";
import ExtraInfoSection from "../components/ExtraInfoSection";

const DisplayScreen = ({ route }) => {
  const {
    user,
    checkSavedGames,
    addGames,
    removeGames,
    checkSavedAchievements,
    addAchievements,
    removeAchievements,
  } = useAuth();

  const { id } = route.params;

  {
    /**
    useState hooks -- We are declaring our state variables. 
    1. isLoading is set to null initially. It will change based on when Loading needs to be demonstrated in the UI -- Why need? To display fetching behavior visually
    2. error is set to null initially. It will change based on if we can properly displayed -- Why need? To display fetching error 
    3. gameData is set to null initially. It will change based on the game data we receive from the Axios call . -- Why need? To display the game's data for user consumption.
    4. page is set to 1 initially. It will change based on the amount of achievements that can currently be displayed. -- Why need? Because API only returns 10 of achievements at a time.
    5. gameAchievements is set to an empty array initially. Will change to display the achievements of the selected game. -- Why need? We need to display the achievements 
    6. gameScreenshots is set to an empty array initially. Will change to display the the collection of available screenshots. -- Why need? We need to display game screenshots  
    7. gameAchievementsCount is set to 0 initially. Will change to count the amount of achievements currently displayed and gathered. --Why need? Because this loads the total number of achievements so we may fetch more if there not all available. 
    */
  }

  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [page, setPage] = useState(1);
  const [gameAchievements, setGameAchievements] = useState([]);
  const [gameScreenShots, setGameScreenShots] = useState([]);
  const [gameAchievementsCount, setGameAchievementsCount] = useState(0);

  const fetchGameData = async () => {
    {
      /* Async Function intended to get game information.
      SetLoading to true as we are waiting for data from the api call. 
      1. Get game details. We accomplish this by using the id param passed in from the search query as an argument and pass it to the axios request.
      2. Get the list of Achievements. We accomplish this by taking two arguments, we need the game id, which we have already passed, and the page number    
      3. Get the list of available screenshots. We accomplish this by taking the id and passing it to the axios request.
      
      Then if data exists, we then update state for 4 of our constants.
      1. We set setGameData to the value of data from the axios request, mutating the state of gameData.
      2. We set setGameAchievements to the value of a copied version of the previous array, adn the achievements array focusing on the results.
      3. We set setScreenShots to the value of screenshots with emphasis on the results.
      4. We then set setGameAchievementCount to the value of achievement with focus on its count. 
    
      Finally we initiate our catch if something goes wrong. Will Implement more fallback later.
      We also setLoading to false, because by this point we have our data ready and waiting to be displayed. 
    */
    }
    try {
      setLoading(true);

      const data = await getGameDetails(id);
      //const achievements = await getGameAchievements(id, page);
      const screenshots = await getGameScreenshots(id);

      if (data) {
        setGameData(data);
        setGameScreenShots(screenshots.results);
      }
    } catch (error) {
      setError(error.message || "Something Went Wrong");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGameAchievement = async () => {
    try {
      setLoading(true);
      const achievements = await getGameAchievements(id, page + 1);

      {
        /**
        Get data for both count and achievements 
        check if achievements data was collected.
        achievement count is put into state
        achievemnt results is placed into state
        
        
        
        
        */
      }

      if (!achievements) {
        console.log("No achievement data obtained.");
        return;
      }

      if (page > 1 && gameAchievements.length === gameAchievementsCount) {
        return;
      }

      if (page > 1 && gameAchievements.length >= gameAchievementsCount) {
        console.log(
          "The total amount of game achievements cannot exceed the amount of achievements total."
        );
        return;
      }

      setGameAchievements((prevPageAchievements) => [
        ...prevPageAchievements,
        ...achievements.results,
      ]);
      setGameAchievementsCount(achievements.count);

      {
        /**
        We first set Loading to true to make sure the user knows that data is being fetched.
        We then gather the data from the axios request for the achievements.
        Next Comes the logic 
          - If there are no achievements then return a console log saying there aren't any achievements
          - If the length/size of the achievements exceeds the amount returned then return nothing.
          - If there is no page, return a console log saying there are either no more pages to fetch or there are no pages.
        */
      }

      //Stop if all achievements have been loaded

      {
        /**
        If the page is 1, which it will almost always start on, place the data we received in to the state gameAchievements with the set function. 
        Else, whenever there are other pages, append the data form the previous array to a new array. 
    */
      }

      setLoading(false);
    } catch (error) {
      setError(error.message || "Something Went Wrong");
      console.error("Fetch error:", error);
    }
  };

  const inLibrary = gameData ? checkSavedGames(gameData.id) : false;

  const strippedDescription = gameData?.description_raw
    ? gameData.description_raw.replace(/<[^>]*>/g, "")
    : "";

  // //Child
  // const AchievementsComponent = ({ getAchievements, achievementsCount }) => {
  //   {
  //     /**
  // Achievement Child Component to style the Component to display Achievement data.
  // */
  //   }

  //   console.log(getAchievements.map((a) => a.id));
  //   console.log(achievementsCount);
  //   const detailed = getAchievements.map((index) => index.name);

  //   if (!getAchievements || !achievementsCount) return;
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Text style={styles.gameAchievementsTitle}>
  //         There are {achievementsCount} Total Achievements:
  //       </Text>
  //       <Text style={styles.gameAchievementsTitle}>
  //         Currently Displaying {getAchievements.length}/{achievementsCount}
  //       </Text>

  //       <View
  //         style={{
  //           ...styles.gameAchievementsContainer,
  //         }}
  //       >
  //         {getAchievements.map((index) => {
  //           return (
  //             <View style={{ maxHeight: 300 }} key={index.id}>
  //               <ScrollView
  //                 // key={index.id}
  //                 contentContainerStyle={{
  //                   borderColor: "black",
  //                   borderWidth: 7,
  //                   margin: 7,
  //                   paddingLeft: 7,
  //                   paddingRight: 7,
  //                 }}
  //                 nestedScrollEnabled
  //               >
  //                 <Text style={styles.gameAchievementsTitle}>
  //                   Title: {index.name}
  //                 </Text>

  //                 <Text style={styles.gameAchievementsText}>
  //                   Description: {index.description}
  //                   {"\n"}
  //                 </Text>
  //               </ScrollView>
  //             </View>
  //           );
  //         })}
  //       </View>
  //     </View>
  //   );
  // };

  useEffect(() => {
    {
      /*
    Runs getGameData() when the component first mounts and whenever `id` or `page` changes.

- We don’t trigger this fetch with a button, so useEffect handles the side effect render.
- Including `id` ensures we fetch again if the user navigates to the same screen with a different game. Not entirely integral now but important for the future.
- Including `page` ensures we fetch again when pagination changes.

Without this, the screen could show empty or stale data depending on navigation behavior.
    */
    }
    if (id) {
      const fetchInitialPage = async () => {
        setLoading(true);
        const initialAchievement = await getGameAchievements(id, 1);
        console.log(initialAchievement.results);
        if (!initialAchievement) {
          console.log("No achievement data obtained.");
          return;
        }
        setGameAchievements(initialAchievement.results);
        setGameAchievementsCount(initialAchievement.count);
      };
      fetchGameData();

      fetchInitialPage();
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {isLoading ? (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ fontSize: 30, textAlign: "center", color: "#fff" }}>
            Loading...
          </Text>
        </View>
      ) : gameData ? (
        <ScrollView>
          {user ? (
            <>
              {/* Save / Remove button */}
              {inLibrary ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => removeGames(gameData)}
                >
                  <Text>This Game is Already in your Library, remove?</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => addGames(gameData)}
                >
                  <Text>Would You Like to Save This Game?</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View>
              <Text style={styles.mainText}>
                Please log in to save/remove games.
              </Text>
            </View>
          )}

          {/* Game screenshots */}
          <View style={{ height: 200, marginVertical: 10 }}>
            {gameScreenShots && gameScreenShots.length > 0 ? (
              <FlatList
                data={gameScreenShots}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.gameImageScreenShot}
                    resizeMode="cover"
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                contentContainerStyle={styles.screenshotRow}
              />
            ) : (
              gameData?.background_image && (
                <Image
                  source={{ uri: gameData.background_image }}
                  style={styles.gameImageFallback}
                  resizeMode="cover"
                />
              )
            )}
          </View>

          {/* Game title */}
          <Text style={styles.gameTitleText}>{gameData.name}</Text>

          {/* Game description */}
          <Text style={styles.gameDescriptionText}>
            {strippedDescription}
            {/* Strip HTML tags for better readability  */}
          </Text>

          {/* Extra info */}
          <ExtraInfoSection gameData={gameData} />

          {/* <View style={styles.extraInfoContainer}>
            <FontAwesome name="info" size={24} color="#fff" />
            <Text style={styles.extraInfoTitleText}>Extra Information</Text>
            <Text style={styles.extraInfoText}>
              Metacritic Score: {gameData.metacritic}
            </Text>
            <Text style={styles.extraInfoText}>
              Released: {gameData.released}
            </Text>
            <Text style={styles.extraInfoText}>
              Platforms:{" "}
              {gameData.platforms.map((p) => p.platform.name).join(", ")}
            </Text>
            <Text style={styles.extraInfoText}>
              Genres: {gameData.genres.map((g) => g.name).join(", ")}
            </Text>
          </View> */}

          {/* Achievements Display 
          This View will display the achievements the APi has access to. 
          It will only show 10 before another call is initiated by the user.
          If the length of the gameAchievements array is less then the count of game achievements a button will be visible to display more
          We then iterate over the array with a .map method to show each achievement's name, description, along with its index number.
          --Future updates, could convert into a component for cleaner code, logic for saving achievements is done on AsyncStorage just not on Font-End.
          */}

          <View>
            {gameAchievements.length >= gameAchievementsCount ? (
              <>
                <Text style={styles.gameAchievementsTitle}>
                  All achievements have been collected
                </Text>
              </>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setPage((prevPage) => prevPage + 1);
                  fetchGameAchievement();
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Fetch More Achievements {"\n"}(Currently Displaying{" "}
                  {gameAchievements.length}/{gameAchievementsCount})
                </Text>
              </TouchableOpacity>
            )}

            <AchievementSection
              getAchievements={gameAchievements}
              achievementsCount={gameAchievementsCount}
            />
            {/* <AchievementsComponent
              getAchievements={gameAchievements}
              achievementsCount={gameAchievementsCount}
            /> */}
          </View>
        </ScrollView>
      ) : (
        !isLoading &&
        !error && (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>No Data Available</Text>
          </ScrollView>
        )
      )}
      {error && <Text>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
  },

  mainText: {
    textAlign: "center",
    color: "#fff",
    margin: 10,
    fontWeight: 200,
    fontSize: 17,
    alignSelf: "center",
    letterSpacing: 1,
  },

  gameTitleText: {
    marginTop: 5,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },

  screenshotRow: {
    paddingHorizontal: 10,
  },
  gameImageScreenShot: {
    margin: 20,
    aspectRatio: 16 / 9,
    borderRadius: 10,
    borderWidth: 7,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#1e1e1e",
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  gameImageFallback: {
    margin: 20,
    aspectRatio: 16 / 9,
    borderRadius: 10,
    borderWidth: 7,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#1e1e1e",
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  gameDescriptionText: {
    margin: 20,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: "#fff",
  },

  button: {
    backgroundColor: "#4CAF50", // green background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#000", // subtle shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // shadow for Android
  },

  extraInfoContainer: {
    width: "85%",
    backgroundColor: "#1e1e1e",
    padding: 15,
    margin: 15,
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
  },
  extraInfoTitleText: {
    marginTop: 5,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  extraInfoText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },

  gameAchievementsContainer: {
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    padding: 20,
    margin: 10,
  },
  gameAchievementsTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },

  gameAchievementsText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
  },
});
export default DisplayScreen;
