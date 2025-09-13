import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainView}>
      <Text style={styles.titleText}>
        {"  "}
        Welcome To Gamer Grotto One Stop Shop For all Your Gaming Needs!
      </Text>

      <View style={styles.view}>
        <Text style={styles.mainText}>
          If you're new here, please register to get full access to the services
          provided.
          {"\n"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Registration")}
        >
          <Text style={styles.mainText}>Register Here</Text>
        </TouchableOpacity>

        <Text style={styles.mainText}>
          {"\n"}
          If you are a returning user please log in to access your account
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.button}
        >
          <Text style={styles.mainText}>Login Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#ADD8E6",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    flex: 1,
    centerItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    margin: 20,
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
  },
  mainText: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    margin: 10,
    backgroundColor: "#814281ff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 200,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default HomeScreen;
