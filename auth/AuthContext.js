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
    const account = await AsyncStorage.getItem(`user`);
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

  const addGames = (gameID, gameName) => {
    if (savedGames.some((game) => game.id === gameID)) {
      alert(`${gameName} was already added!`);
    } else {
      const updated = [...savedGames, { id: gameID, name: gameName }];
      setSavedGames(updated);
      alert("Game Was Added to Shelf \n" + gameName);
      console.log("Updated array:", updated);
    }
  };

  const removeGames = (gameID, gameName) => {
    const updated = savedGames.filter((game) => game.id !== gameID);
    setSavedGames(updated);
    console.log("Updated array after removal:", updated);
    alert(`${gameName} was removed from your shelf.`);
  };

  const checkSavedGames = (gameID) => {
    return savedGames.some((game) => game.id === gameID);
  };
  // Provide user and auth functions to context consumers
  return (
    <AuthContext.Provider
      value={{
        user,
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
