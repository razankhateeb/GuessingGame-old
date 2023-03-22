import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/ui/PrimaryButton";
function GameOverScreen({ roundsNumber, userNumber, onNewGame }) {
  const { height } = useWindowDimensions();

  let imageSize = 150;

  if (height < 450) imageSize = 80;

  let imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <View>
          <Text style={styles.summaryText}>
            Your Phone needed
            <Text style={styles.highlight}> {roundsNumber} </Text>tries to guess
            the number <Text style={styles.highlight}>{userNumber}</Text>{" "}
          </Text>
        </View>
        <PrimaryButton onPress={onNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}
export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
