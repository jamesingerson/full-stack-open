import Text from "./Text";
import { StyleSheet, View } from "react-native";
import abbreviateValue from "../utils/abbreviateValue";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
});

const Statistic = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight={"bold"}>{abbreviateValue(value)}</Text>
      <Text color={"textSecondary"}>{label}</Text>
    </View>
  );
};

export default Statistic;
