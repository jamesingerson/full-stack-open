import { View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexShrink: 1,
  },
  language: {
    color: "white",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginVertical: 5,
  },
  languages: {
    flexDirection: "row",
  },
});

const Details = ({ name, description, language }) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 3 }} fontWeight={"bold"}>
        {name}
      </Text>
      <Text style={{ marginVertical: 3 }} color={"textSecondary"}>
        {description}
      </Text>
      <View style={styles.languages}>
        <Text style={styles.language}>{language}</Text>
      </View>
    </View>
  );
};

export default Details;
