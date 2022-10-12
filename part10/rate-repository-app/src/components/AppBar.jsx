import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useMe from "../hooks/useMe";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.navBackground,
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { me } = useMe();
  let navigate = useNavigate();

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label={"Repositories"} link={"/"} />
        {!me && (
          <>
            <AppBarTab label={"Sign in"} link={"/signin"} />
            <AppBarTab label={"Sign Up"} link={"/signup"} />
          </>
        )}
        {!!me && (
          <>
            <AppBarTab label={"Create a Review"} link={"/create-review"} />
            <AppBarTab label={"My Reviews"} link={"/my-reviews"} />
            <Pressable onPress={signOut}>
              <Text style={theme.text}>Sign out</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
