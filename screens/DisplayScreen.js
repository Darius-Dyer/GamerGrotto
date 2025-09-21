import { StyleSheet, Text, Image, ScrollView } from "react-native";
import {
  getGameDetails,
  getGameAchievements,
  getGameScreenshots,
} from "../services/games";
import { useEffect, useState } from "react";

const DisplayScreen = ({ route }) => {
  const { id } = route.params;

  const [gameData, setGameData] = useState(null);
  const [gameAchievements, setGameAchievements] = useState(null);

  const getGameData = async () => {
    try {
      const data = await getGameDetails(id);
      const achievements = await getGameAchievements(id);
      if (data) {
        setGameData(data);
        setGameAchievements(achievements);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getGameData();
      getGameAchievements();
    }
  }, [id]);

  return (
    <>
      {gameData ? (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Text style={styles.gameTitleText}>{gameData.name}</Text>
          <Text style={styles.gameDescriptionText}>
            {gameData.description_raw}
          </Text>
          <Text>{gameData.metacritic}</Text>
          <Text>{gameData.released}</Text>
          <Text>{gameAchievements.name}</Text>
          {gameData?.background_image && (
            <Image
              source={{ uri: gameData.background_image }}
              style={styles.gameImage}
            />
          )}
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>No Data Avalianble</Text>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  ScrollView: {},
  gameTitleText: {
    margin: 20,
    textAlign: "center",
    fontSize: 25,
  },
  gameDescriptionText: {
    margin: 10,
    textAlign: "center",
    fontSize: 20,
  },
  gameImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    objectFit: "fill",
  },
});
export default DisplayScreen;
