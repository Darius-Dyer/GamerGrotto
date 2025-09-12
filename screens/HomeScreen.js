import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View, Button } from "react-native";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.view}>
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

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      centerItems: "center",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export default HomeScreen;
