import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { useAuth } from "../auth/AuthContext";

const SavedGamesScreen = () => {
  const { savedGames } = useAuth();

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
    padding: 12,
    backgroundColor: "#D3D3D3",
    marginVertical: 6,
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  empty: { textAlign: "center", marginTop: 20, fontSize: 16 },
});

export default SavedGamesScreen;
