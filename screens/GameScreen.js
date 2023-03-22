import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  FlatList,
} from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function GameScreen({ userNumber, onGameOver }) {
  function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }
  let minBoundary = 1;
  let maxBoundary = 100;
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRound, setGuessRound] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();
  const guessRoundsListLength = guessRound.length;

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      return Alert.alert("Don't lie !", "you know this is wrong ...", [
        { text: "sorry!", style: "cancel" },
      ]);
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNum);
    setGuessRound((prevRound) => [newRndNum, ...prevRound]);
  }

  //on ui update
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRound.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  //on ui render
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructions}>
          Higher or lower
        </InstructionText>
        <View style={styles.ButtonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color={"white"} />
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
            <Ionicons name="md-add" size={24} color={"white"} />
          </PrimaryButton>
        </View>
      </Card>
    </>
  );
  if (width > 500)
    content = (
      <>
        <View style={styles.landscapeButtonsContainer}>
          <View style={styles.landscapeButton}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color={"white"} />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.landscapeButton}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  //vars inside the [] invokes the useEffect
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>

      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRound}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        ></FlatList>
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
  ButtonContainer: {
    flexDirection: "row",
  },
  instructions: {
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  landscapeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  landscapeinst: {
    textAlign: "center",
  },
  landscapeButton: {
    width: "100%",
    flex: 1,
  },
});
