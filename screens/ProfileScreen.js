import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../auth/AuthContext";

const ProfileScreen = () => {
  const { user, signIn } = useAuth();

  const handleLogin = async () => {
    const successLogin = await signIn(username, password);
    if (successLogin) {
      alert("Login Successful!");
      // Optionally navigate or update UI
    } else {
      alert("Invalid username or password");
    }
  };

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        centerItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.text}>
        Welcome to the Profile Screen{"\n"}
        Here you can log in to your account.
      </Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        style={{
          width: "80%",
          borderColor: "#000",
          borderWidth: 1,
          padding: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.textInput}
          returnKeyType="next"
          value={username}
          maxLength={20}
          placeholder="Username"
          onChangeText={setUsername}
          onSubmitEditing={() => passwordRef.current.focus()}
          submitBehavior="submit"
        />
        <TextInput
          style={styles.textInput}
          returnKeyType="done"
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          ref={passwordRef}
          secureTextEntry
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          submitBehavior="submit"
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            alignItems: "center",
            backgroundColor: "#DDDDDD",
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const account = await AsyncStorage.getItem(`user_${username}`);
            if (account) {
              console.log("Stored account data:", JSON.parse(account));
              alert("Check console for stored account data.");
            } else {
              console.log("No account data found.");
              alert("No account data found.");
            }
          }}
          style={{
            alignItems: "center",
            backgroundColor: "#FFD700",
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text>Debug: Show Stored Account</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Log Out (Not Implemented){"\n"}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Note: This is a mock login screen. No real authentication is
          performed.{"\n"}...Currently Logged in as:{" "}
          {user ? user.username : "Guest"}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },

  textInput: {
    borderBlockColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    textAlign: "center",
  },
});
export default ProfileScreen;
