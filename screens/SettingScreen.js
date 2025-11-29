import { View, Text } from "react-native";

const SettingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        centerItems: "center",
        justifyContent: "center",
        backgroundColor: "#1e1e1e",
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 30, color: "#fff" }}>
        Settings Screen
      </Text>
    </View>
  );
};
export default SettingScreen;
