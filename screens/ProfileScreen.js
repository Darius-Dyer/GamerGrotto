import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";

const ProfileScreen = () => {
  const { user, signIn, checkAccount, signOut } = useAuth();

  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const successLogin = await signIn(username, password);
    alert(successLogin ? "Login Successful!" : "Invalid username or password");
  };

  const handleSignOut = async () => {
    await signOut();
    alert("Logged out successfully");
  };

  const checkStoredAccount = async () => {
    await checkAccount(username);
    alert("Check console for stored account data.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the Profile Screen{"\n"}Here you can log in to your account.
      </Text>

      <TextInput
        style={styles.textInput}
        returnKeyType="next"
        value={username}
        maxLength={20}
        placeholder="Username"
        onChangeText={setUsername}
        onSubmitEditing={() => passwordRef.current.focus()}
        placeholderTextColor={"#fff"}
      />
      <TextInput
        style={styles.textInput}
        returnKeyType="done"
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        ref={passwordRef}
        secureTextEntry
        placeholderTextColor={"#fff"}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={checkStoredAccount} style={styles.debugButton}>
        <Text style={styles.buttonText}>Debug: Show Stored Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Note: This is a mock login screen.{"\n"}Currently Logged in as:{" "}
        {user ? user.username : "Guest"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "#fff",
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
    textAlign: "center",
    width: "80%",
    color: "#fff",
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  debugButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfileScreen;
