import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View, Button } from "react-native";

const HomeScreen = () => {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        centerItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <Text>Home Screen</Text>
      </View>

      <View
        style={{
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          Welcome To Gamer Grotto {"\n"}
          One Stop Shop For all Your Gaming Needs!
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
