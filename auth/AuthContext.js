import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);

  // Simulated sign-up function
  const signUp = async (username, password, email) => {
    console.log("Signing up user:", username, email);
    // Simulate successful sign-up
    setUser({ username, email });
    return { username, email };
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

  // Provide user and auth functions to context consumers
  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
