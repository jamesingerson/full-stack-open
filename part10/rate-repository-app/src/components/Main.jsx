import { StyleSheet, View } from "react-native";
import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryListContainer";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import RepositoryReviews from "./RepositoryReviews";
import ReviewForm from "./ReviewForm";
import SignUpForm from "./SignUpForm";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackgroud,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/create-review" element={<ReviewForm />} exact />
        <Route path="/my-reviews" element={<MyReviews />} exact />
        <Route path="/signup" element={<SignUpForm />} exact />
        <Route path="/repository/:id" element={<RepositoryReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
