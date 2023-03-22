import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";

function StartGameScreen({ onPickedNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function confirmInputHandler() {
    const confirmedNumber = parseInt(enteredNumber);

    if (
      isNaN(confirmedNumber) ||
      confirmedNumber <= 0 ||
      confirmedNumber > 99
    ) {
      Alert.alert(
        "Invalid Number",
        "number must be a number between 0 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onPickedNumber(confirmedNumber);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  const marginTopHeight = height < 450 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopHeight }]}>
          <Title>Guess My Number</Title>
          <Card>
            <Text style={styles.instructionText}>Enter a number</Text>

            <TextInput
              style={styles.NumberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.ButtonContainer}>
              <PrimaryButton onPress={resetInputHandler}> Reset</PrimaryButton>
              <PrimaryButton onPress={confirmInputHandler}>
                {" "}
                Confirm
              </PrimaryButton>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },
  NumberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
