import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  getGameDetails,
  getGameAchievements,
  getGameScreenshots,
} from "../services/games";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

const DisplayScreen = ({ route }) => {
  const { checkSavedGames, addGames, removeGames } = useAuth();

  const { id } = route.params;
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [gameData, setGameData] = useState(null);
  const [gameAchievements, setGameAchievements] = useState([]);
  const [gameScreenShots, setGameScreenShots] = useState([]);

  const getGameData = async () => {
    try {
      setLoading(true);
      const data = await getGameDetails(id);
      const achievements = await getGameAchievements(id);
      const screenshots = await getGameScreenshots(id);
      if (data) {
        setGameData(data);
        setGameAchievements(achievements.results);
        setGameScreenShots(screenshots.results);
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
  }, [id]);

  return (
    <>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}

      {gameData ? (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {/* Save / Remove button */}
          {inLibrary ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeGames(gameData.id, gameData.name)}
            >
              <Text>
                This Game is Already in your Library, Would you like to remove
                it?
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => addGames(gameData.id, gameData.name)}
            >
              <Text>Would You Like to Save This Game?</Text>
            </TouchableOpacity>
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
          <Text>The Current Metacritic Score: {gameData.metacritic}</Text>
          <Text>Released: {gameData.released}</Text>

          {/* Achievements */}
          <View style={styles.gameAchievementsContainer}>
            <Text style={styles.gameAchievementsTitle}>Achievements{"\n"}</Text>
            {gameAchievements.map((ach, index) => (
              <Text key={index} style={styles.gameAchievementsText}>
                Name: {ach.name} {"\n"}Description: {ach.description}
              </Text>
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
  gameTitleText: {
    marginTop: 5,
    marginBottom: 12, // space before the description or image
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700", // bold, but crisper than "bold"
    color: "#000000ff", // white (works well with dark background)
    letterSpacing: 0.5,
  },
  screenshotRow: {
    paddingHorizontal: 10,
  },
  gameDescriptionText: {
    marginHorizontal: 20, // breathing room on the sides
    marginBottom: 20, // space before the next section
    textAlign: "center", // centered for symmetry, or "left" for readability
    fontSize: 16,
    lineHeight: 22, // improves readability on longer blocks
    color: "#000000ff",
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
  gameImageScreenShot: {
    margin: 20,
    aspectRatio: 16 / 9,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#222",
    width: 300,
    height: 300,
    backgroundColor: "#222",
    alignSelf: "center",
  },
  gameImageFallback: {
    margin: 20,
    aspectRatio: 16 / 9,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#222",
    width: 170,
    height: 170,
    backgroundColor: "#222",
    alignSelf: "center",
  },
  gameAchievementsContainer: {
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "teal",
    padding: 5,
    margin: 10,
  },
  gameAchievementsTitle: { fontSize: 25, margin: 7, textAlign: "center" },

  gameAchievementsText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
});
export default DisplayScreen;
