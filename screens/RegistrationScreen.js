import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useAuth } from "../auth/AuthContext";
import { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const RegistrationScreen = () => {
  const { signUp, user } = useAuth();
  const navigation = useNavigation();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    // Basic validation
    //If the passwords do not match, alert the user and return
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
      return;

      //If the username is less than 3 characters, alert the user and return
    } else if (username.length < 3) {
      console.log("Username must be at least 3 characters long");
      alert("Username must be at least 3 characters long");
      return;

      //If the password is less than 5 characters, alert the user and return
    } else if (password.length < 5) {
      console.log("Password must be at least 5 characters long");
      alert("Password must be at least 5 characters long");
      return;
    }

    // Call the signUp function from AuthContext
    await signUp(username, password, email);

    // Save user data to AsyncStorage
    try {
      await AsyncStorage.setItem(
        `user_${username}`,
        JSON.stringify({ username, password, email })
      );
      alert("Signup Successful!");
    } catch (error) {
      console.log("Error saving user data: ", error);
    }
    // Handle signup logic here
    console.log(
      "Signup button pressed " +
        "Username:" +
        username +
        " " +
        "Password:" +
        password +
        " " +
        "Confirm Password:" +
        confirmPassword +
        " " +
        "Email:" +
        email
    );
  };

  // Function to check if account exists
  const checkAccount = async () => {
    const account = await AsyncStorage.getItem(`user`);
    if (account) {
      alert(
        "Account exists, user is registered:" +
          "Username:" +
          username +
          " " +
          "Password:" +
          password
      );
      // Account exists, user is registered
    } else if (account && username && password) {
      alert("Account already exists, please log in");
      // Account exists, user is registered
    } else {
      alert("No account found, please register");
      // No account, show registration
    }
  };

  return (
    // Registration Screen
    // Using KeyboardAvoidingView to prevent keyboard from covering inputs
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to the Registration Screen. {"\n"}
          Here you may signup for an account.
        </Text>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            returnKeyType="next"
            style={styles.textInput}
            value={username}
            maxLength={20}
            placeholder="Username"
            onChangeText={setUsername}
            onSubmitEditing={() => passwordRef.current.focus()}
            submitBehavior="submit"
          />
          <TextInput
            returnKeyType="next"
            style={styles.textInput}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            ref={passwordRef}
            secureTextEntry
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            submitBehavior="submit"
          />

          <TextInput
            ref={confirmPasswordRef}
            style={styles.textInput}
            value={confirmPassword}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            submitBehavior="submit"
          />

          <TextInput
            ref={emailRef}
            style={styles.textInput}
            value={email}
            placeholder="Email (Optional)"
            onChangeText={setEmail}
            keyboardType="email-address"
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={async () => {
              const result = await handleSignup();
              if (result) {
                navigation.navigate("Main", { screen: "Home" });
              }
            }}
            style={styles.textInput}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={checkAccount} style={styles.textInput}>
            <Text>Check Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ADD8E6",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#a3a3a3ff",
    shadowColor: "#000",
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
export default RegistrationScreen;
