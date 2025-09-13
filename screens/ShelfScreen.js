import { Text, View, StyleSheet } from "react-native";

const ShelfScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Shelf Screen</Text>
      <Text style={styles.mainText}>
        On this screen you may add any game from the database and, view all of
        th games from your personal shelf.
      </Text>
    </View>
  );
};
const styles = createStyleSheet({
  container: {
    flex: 1,
    centerItems: "center",
    justifyContent: "center",
  },
  mainView: {
    backgroundColor: "#ADD8E6",
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    margin: 20,
    fontSize: 30,
  },
  mainText: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default ShelfScreen;
