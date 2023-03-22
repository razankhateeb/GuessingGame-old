import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/Colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}
export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
    textAlign: "center",
    // borderWidth: Platform.select({ ios: 2, android: 0 }),
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
});
