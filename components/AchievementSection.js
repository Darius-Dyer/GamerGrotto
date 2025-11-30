import { View, Text, ScrollView, StyleSheet } from "react-native";

//Child
const AchievementSection = ({ getAchievements, achievementsCount }) => {
  {
    /**
  Achievement Child Component to style the Component to display Achievement data.
  */
  }

  console.log(getAchievements.map((a) => a.id));
  console.log(achievementsCount);
  const detailed = getAchievements.map((index) => index.name);

  if (!getAchievements || !achievementsCount) return;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.gameAchievementsContainer}>
        <Text style={styles.gameAchievementsTitle}>
          Currently Displaying {getAchievements.length}/{achievementsCount}
        </Text>
        <View style={{ maxHeight: 300 }}>
          <ScrollView
            contentContainerStyle={{
              borderColor: "black",
              margin: 7,
              paddingLeft: 7,
              paddingRight: 7,
              flexGrow: 1,
            }}
            nestedScrollEnabled
          >
            {getAchievements.map((id, index) => {
              return (
                <View
                  key={id.id}
                  style={{
                    borderRadius: 5,
                    borderWidth: 5,
                    borderColor: "#000000ff",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.gameAchievementsTitle}>
                    Title: {id.name}
                  </Text>

                  <Text style={styles.gameAchievementsText}>
                    Description: {"\n"} {id.description}
                  </Text>

                  <Text style={styles.gameAchievementsText}>
                    Completed: {"\n"}
                    {id.percent}%
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameAchievementsContainer: {
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    padding: 20,
    margin: 10,
  },
  gameAchievementsTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },

  gameAchievementsText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
    flexWrap: "wrap",
    letterSpacing: 0.5,
    lineHeight: 20,
  },
});

export default AchievementSection;
