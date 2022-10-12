import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.textInput, error && styles.inputError];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
