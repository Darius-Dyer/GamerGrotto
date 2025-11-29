import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const ExtraInfoSection = ({ gameData }) => {
  const metacriticColorScore = {
    fantastic: "#c8e6c9",
    great: "#8bc34a",
    good: "#ffeb3b",
    meh: "#ff9800",
    poor: "#f44336",
    abysmal: "#b71c1c",
  };
  const metacriticScore = {
    fantastic: "Fantastic",
    great: "Great",
    good: "Good",
    meh: "Meh",
    poor: "Poor",
    abysmal: "Abysmal",
  };

  const getMetacriticScoreColor = (score) => {
    if (!score) return null;
    console.log("Now evaluating score color for: " + score);

    if (score >= 0 && score < 20) {
      return metacriticColorScore.abysmal;
    }
    if (score >= 20 && score < 40) {
      return metacriticColorScore.poor;
    }
    if (score >= 40 && score < 60) {
      return metacriticColorScore.meh;
    }
    if (score >= 60 && score < 80) {
      return metacriticColorScore.good;
    }
    if (score >= 80 && score < 90) {
      return metacriticColorScore.great;
    }
    if (score >= 90) {
      return metacriticColorScore.fantastic;
    }
    return null;
  };
  const getMetacriticScoreText = (score) => {
    if (!score) return null;
    console.log("Now evaluating score text for: " + score);
    if (score >= 0 && score < 20) {
      return metacriticScore.abysmal;
    }
    if (score >= 20 && score < 40) {
      return metacriticScore.poor;
    }
    if (score >= 40 && score < 60) {
      return metacriticScore.meh;
    }
    if (score >= 60 && score < 80) {
      return metacriticScore.good;
    }
    if (score >= 80 && score < 90) {
      return metacriticScore.great;
    }
    if (score >= 90) {
      return metacriticScore.fantastic;
    }
    return null;
  };

  return (
    <View style={styles.extraInfoContainer}>
      <FontAwesome name="info" size={24} color="#fff" />
      <Text style={styles.extraInfoTitleText}>Extra Information</Text>

      {!gameData.metacritic ? (
        <Text style={styles.extraInfoText}>Metacritic Score: N/A</Text>
      ) : (
        getMetacriticScoreColor(gameData.metacritic) && (
          <Text style={styles.extraInfoText}>
            Metacritic Score: {gameData.metacritic} {"\n"}
            <Text
              style={{ color: getMetacriticScoreColor(gameData.metacritic) }}
            >
              ({getMetacriticScoreText(gameData.metacritic)})
            </Text>
          </Text>
        )
      )}

      <Text style={styles.extraInfoText}>Released: {gameData.released}</Text>
      <Text style={styles.extraInfoText}>
        Platforms: {gameData.platforms.map((p) => p.platform.name).join(", ")}
      </Text>
      <Text style={styles.extraInfoText}>
        Genres: {gameData.genres.map((g) => g.name).join(", ")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  extraInfoContainer: {
    width: "85%",
    backgroundColor: "#1e1e1e",
    padding: 15,
    margin: 15,
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
  },
  extraInfoTitleText: {
    marginTop: 5,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  extraInfoText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
});
export default ExtraInfoSection;
