import * as React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useAuth } from "../auth/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../services/themes";
const HomeScreen = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/*Conditional rendering - If User is logged in, display welcome back
        message. If not logged in it will display guest message.*/}
        {user ? (
          <View style={styles.view}>
            <Text style={styles.titleText}>
              {"  "}
              Welcome Back To Gamer Grotto {user.username}!{"\n"}
              Enjoy your stay!
            </Text>
            <View style={styles.view}>
              <Text style={styles.mainText}>
                If You would like to edit or log out of your account,{"\n"}
                please navigate to the Profile Screen
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                styles={styles.button}
              >
                <Text style={styles.mainText}>Go to Profile</Text>
              </TouchableOpacity>
              <Text>You currently have saved games.</Text>
            </View>
          </View>
        ) : (
          <View style={styles.view}>
            <Text style={styles.titleText}>
              {"  "}
              Welcome To Gamer Grotto One Stop Shop For all Your Gaming Needs!
              {"\n"}
              You are currently Logged in as a Guest
            </Text>

            <View style={styles.view}>
              <Text style={styles.mainText}>
                If you're new here, please register to get full access to the
                services provided.
                {"\n"}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.mainText}>Register Here</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.view}>
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
        )}
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
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 80,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default HomeScreen;
