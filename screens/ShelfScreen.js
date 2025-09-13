import { Text, View, StyleSheet, Keyboard, ScrollView } from "react-native";
import { useState } from "react";
import { SearchBar } from "@rneui/themed";

const ShelfScreen = () => {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch({ search });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Shelf Screen</Text>
      <Text style={styles.mainText}>
        On this screen you may add any game from the database and, view all of
        th games from your personal shelf.
      </Text>
      <ScrollView
        style={styles.mainView}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <SearchBar
          placeholder="Enter Game Here"
          onChangeText={updateSearch}
          value={search}
          platform="android"
          rounded
          style={styles.searchBarStyle}
        />
        <Text style={styles.mainText}>Search Results:</Text>
        {/* Add code here to display search results and allow adding to shelf */}
      </ScrollView>
    </View>
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
    margin: 20,
    fontSize: 30,
  },
  mainText: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBarStyle: {
    height: 20,
    borderRadius: 50,
    margin: 10,
    backgroundColor: "#ADD8E6",
    width: 300,
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
  },
});
export default ShelfScreen;
