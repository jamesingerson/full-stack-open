import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  languages: {
    flexDirection: "row",
  },
  credentials: {
    backgroundColor: "white",
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username must be between 1-30 characters")
    .max(30, "Username must be between 1-30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be between 5-50 characters")
    .max(50, "Username must be between 5-50 characters"),
  confirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const initialValues = {
  username: "",
  password: "",
  confirmation: "",
};

const NewUserForm = ({ onSubmit }) => {
  return (
    <View style={styles.credentials}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="confirmation"
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text style={theme.button}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpForm = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { createUser } = await signUp({
        username,
        password,
      });
      if (createUser.id) {
        try {
          const { authenticate } = await signIn({ username, password });
          navigate("/", { replace: true });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <NewUserForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpForm;
