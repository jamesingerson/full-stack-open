import { Pressable, Text } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

const AppBarTab = ({ label, link }) => {
  return (
    <Pressable>
      <Link to={link}>
        <Text style={theme.text}>{label}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
