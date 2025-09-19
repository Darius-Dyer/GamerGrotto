import { View, Text, Button, ScrollView } from "react-native";
import { getGameDetails } from "../services/games";
import { useEffect, useState } from "react";

const DisplayScreen = ({ route }) => {
  const { id } = route.params;

  const [gameData, setGameData] = useState(null);

  const getGameData = async () => {
    try {
      const data = await getGameDetails(id);
      if (data) setGameData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getGameData();
    }
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Display Screen</Text>

      {/* show description if available */}
      {gameData ? (
        <Text>{gameData.description_raw}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

export default DisplayScreen;
