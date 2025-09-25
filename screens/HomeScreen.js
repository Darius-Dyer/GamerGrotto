import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useAuth } from "../auth/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
const HomeScreen = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/*Conditional rendering - If User is logged in, display welcome back
        message. If not logged in it will display guest message.*/}
        {user ? (
          <View style={styles.card}>
            <Text style={styles.titleText}>
              Welcome Back To Gamer Grotto {user.username}!
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.buttonWrapper}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#8e2de2", "#ff6ec4"]} // purple → pink
                style={styles.button}
              >
                <Text style={styles.buttonText}>Go to Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.titleText}>Welcome To Gamer Grotto</Text>
            <Text style={styles.mainText}>Log in or register to continue:</Text>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => navigation.navigate("Registration")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#00c6ff", "#0072ff"]} // blue gradient
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => navigation.navigate("Profile")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#8e2de2", "#ff6ec4"]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 25,
    margin: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 8,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5f5f5",
    textAlign: "center",
    marginBottom: 15,
  },
  mainText: {
    fontSize: 18,
    color: "#b0b0b0",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonWrapper: {
    width: "100%",
    marginVertical: 8,
  },
  button: {
    paddingVertical: 15,
    width: 150,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default HomeScreen;
