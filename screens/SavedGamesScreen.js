import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";
import { useAuth } from "../auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const SavedGamesScreen = () => {
  const { savedGames, removeGames, user } = useAuth();
  const navigation = useNavigation();

  console.log(savedGames);
  return (
    <>
      {!user ? (
        <View style={styles.container}>
          <Text style={styles.titleText}>
            You must be Logged in or Register To Save Games.
          </Text>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.navigate("Profile")}
          >
            <LinearGradient
              colors={["#8e2de2", "#ff6ec4"]} // purple → pink
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign In Here</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          {savedGames && savedGames.length > 0 ? (
            <FlatList
              data={savedGames}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.title}>
                    {item.name}
                    {item.released}
                  </Text>
                  {/* <Image
                source={{ uri: item.background_image }}
                style={styles.gameImage}
              /> */}
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.button, styles.viewButton]}
                      onPress={() =>
                        navigation.navigate("Game Details", { id: item.id })
                      }
                    >
                      <Text style={styles.buttonText}>View Game</Text>
                      <FontAwesome name="file-text-o" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.removeButton]}
                      onPress={() => removeGames(item)}
                    >
                      <Text style={styles.buttonText}>Remove</Text>
                      <FontAwesome name="trash-o" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={styles.empty}>No games saved yet.</Text>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  card: {
    padding: 16,
    backgroundColor: "#f4f4f4",
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5f5f5",
    textAlign: "center",
    marginBottom: 15,
  },
  gameImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  empty: { textAlign: "center", marginTop: 20, fontSize: 16 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttonWrapper: {
    width: "100%",
    marginVertical: 8,
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewButton: {
    backgroundColor: "#4CAF50", // green
  },
  removeButton: {
    backgroundColor: "#E53935", // red
  },
});

export default SavedGamesScreen;
