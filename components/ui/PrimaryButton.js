import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.ButtonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.ButtonInnerContainer, styles.pressed]
            : styles.ButtonInnerContainer
        }
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.ButtonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  ButtonOuterContainer: {
    flex: 1,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    borderRadius: 28,
    overflow: "hidden",
    width: "100%",
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
