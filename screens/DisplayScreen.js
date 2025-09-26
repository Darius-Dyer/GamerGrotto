import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  getGameDetails,
  getGameAchievements,
  getGameScreenshots,
} from "../services/games";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

const DisplayScreen = ({ route }) => {
  const { user, checkSavedGames, addGames, removeGames } = useAuth();

  const { id } = route.params;
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [gameData, setGameData] = useState(null);
  const [page, setPage] = useState(1);
  const [gameAchievements, setGameAchievements] = useState([]);
  const [gameScreenShots, setGameScreenShots] = useState([]);
  const [gameAchievementsCount, setGameAchievementsCount] = useState(0);

  const getGameData = async () => {
    try {
      setLoading(true);
      const data = await getGameDetails(id);
      const achievements = await getGameAchievements(id, page);
      const screenshots = await getGameScreenshots(id);
      if (data) {
        setGameData(data);
        setGameAchievements((prev) => [...prev, ...achievements.results]);
        setGameScreenShots(screenshots.results);
        setGameAchievementsCount(achievements.count);
      }
    } catch (error) {
      setError(error.message || "Something Went Wrong");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const inLibrary = gameData ? checkSavedGames(gameData.id) : false;

  useEffect(() => {
    if (id) {
      getGameData();
    }
  }, [id, page]);

  return (
    <>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}

      {gameData ? (
        <ScrollView contentContainerStyle={styles.container}>
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
            {gameData.description_raw}
          </Text>

          {/* Extra info */}
          <View style={styles.extraInfoContainer}>
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
          </View>

          {/* Achievements */}
          <View style={styles.gameAchievementsContainer}>
            <Text style={styles.gameAchievementsTitle}>
              Showing {gameAchievements.length} of {gameAchievementsCount}{" "}
              Achievements
            </Text>

            {gameAchievements.length < gameAchievementsCount && (
              <Button
                title="Load More"
                onPress={() => setPage((prev) => prev + 1)}
              />
            )}

            {gameAchievements.map((ach, index) => (
              <>
                <Text key={index} style={styles.gameAchievementsText}>
                  {"\n"}
                  {index}. Name: {ach.name} {"\n"}Description: {ach.description}
                </Text>
              </>
            ))}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flexGrow: 1,
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
    padding: 30,
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
  },
});
export default DisplayScreen;
