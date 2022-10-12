import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";

const styles = StyleSheet.create({
  languages: {
    flexDirection: "row",
  },
  credentials: {
    backgroundColor: "white",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const CredentialForm = ({ onSubmit }) => {
  return (
    <View style={styles.credentials}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text style={theme.button}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export const SignInForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CredentialForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignInForm;
