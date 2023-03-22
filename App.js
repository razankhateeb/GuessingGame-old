import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import Apploading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessesNumber, setGuessesNumber] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/font/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/font/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Apploading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessesNumber(numberOfRounds);
  }

  function startNewgameHandler() {
    setUserNumber(null);
    setGuessesNumber(0);
  }
  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        onNewGame={startNewgameHandler}
        roundsNumber={guessesNumber}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.RootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode={"cover"}
          style={styles.RootScreen}
          imageStyle={styles.BackgroundImage}
        >
          <SafeAreaView style={styles.RootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  RootScreen: {
    flex: 1,
  },
  BackgroundImage: {
    opacity: 0.15,
  },
});
