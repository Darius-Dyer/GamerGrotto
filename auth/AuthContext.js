import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);
  const [savedGames, setSavedGames] = useState([]);

  // Simulated sign-up function
  const signUp = async (username, password, email) => {
    console.log("Signing up user:", username, email);
    // Simulate successful sign-up
    if (!username || !password) {
      alert("Username and password are required");
      return false;
    } else if (password.length < 5) {
      alert("Password must be at least 5 characters long");
      return false;
    }
    setUser({ username, email });
    return true, { username, email };
  };

  // Simulated sign-in function
  const signIn = async (username, password) => {
    const account = await AsyncStorage.getItem(`user_${username}`);
    if (!account) {
      console.log("No account found for username:", username);
      alert("No account found for username: " + username);
      return false;
    }
    const userData = JSON.parse(account);
    if (password === userData.password) {
      setUser(userData);
      const gamesKey = `savedGames_${username}`;
      const storedGames = await AsyncStorage.getItem(gamesKey);
      setSavedGames(storedGames ? JSON.parse(storedGames) : []);
      console.log("User signed in:", username);
      alert("Login Successful!");
      return true;
    }
    alert("Invalid username or password");
    return false;
  };

  // Simulated sign-out function
  const signOut = async () => {
    console.log("Signing out user");
    setUser(null);
    return;
  };

  const checkAccount = async () => {
    const account = await AsyncStorage.getItem(`user_${user.username}`);
    if (account) {
      console.log("Stored Account data: ", JSON.parse(account));
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
    }
  };

  const addGames = async (game) => {
    try {
      if (!user || !user.username) {
        alert("No User Signed In.");
        return;
      }
      const key = `savedGames_${user.username}`;

      if (savedGames.some((g) => g.id === game.id)) {
        alert(`${game.name} was already added!`);
        return;
      }

      const updated = [
        ...savedGames,
        { id: game.id, name: game.name, cover: game.background_image },
      ];
      await AsyncStorage.setItem(key, JSON.stringify(updated));
      setSavedGames(updated);
      alert("Game Was Added to Shelf \n" + game.name);
      console.log("Updated array:", updated);
    } catch (error) {
      console.error("Error saving game:", err);
    }
  };

  const removeGames = async (game) => {
    try {
      if (!user || !user.username) {
        alert("No User Signed In.");
        return;
      }
      const key = `savedGames_${user.username}`;

      const updated = savedGames.filter((g) => g.id !== game.id);
      await AsyncStorage.setItem(key, JSON.stringify(updated));
      setSavedGames(updated);
      console.log("Updated array after removal:", updated);
      alert(`${game.name} was removed from your shelf.`);
    } catch (error) {
      console.error("Error removing game:", error);
    }
  };

  const checkSavedGames = (game) => {
    return savedGames.some((g) => g.id === game);
  };
  // Provide user and auth functions to context consumers
  return (
    <AuthContext.Provider
      value={{
        user,
        savedGames,
        signUp,
        signIn,
        signOut,
        checkAccount,
        addGames,
        removeGames,
        checkSavedGames,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
