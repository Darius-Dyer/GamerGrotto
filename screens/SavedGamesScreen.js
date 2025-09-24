import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../auth/AuthContext";

const SavedGamesScreen = () => {
  const { savedGames, removeGames } = useAuth();

  console.log(savedGames);
  return (
    <View style={styles.container}>
      {savedGames && savedGames.length > 0 ? (
        <FlatList
          data={savedGames}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.viewButton]}
                  onPress={() => console.log("View:", item.name)}
                >
                  <Text style={styles.buttonText}>View Game</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.removeButton]}
                  onPress={() => removeGames(item)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>No games saved yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
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
  empty: { textAlign: "center", marginTop: 20, fontSize: 16 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#4CAF50", // green
  },
  removeButton: {
    backgroundColor: "#E53935", // red
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default SavedGamesScreen;
