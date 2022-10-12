import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  languages: {
    flexDirection: "row",
  },
  credentials: {
    backgroundColor: "white",
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository Owner Name is required"),
  repositoryName: yup.string().required("Repository Name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string(),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const ReviewDetailsForm = ({ onSubmit }) => {
  return (
    <View style={styles.credentials}>
      <FormikTextInput name="ownerName" placeholder="Repository Owner Name" />
      <FormikTextInput name="repositoryName" placeholder="Repository Name" />
      <FormikTextInput
        name="rating"
        placeholder="Rating from 0-100"
        keyboardType={"numeric"}
      />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit}>
        <Text style={theme.button}>Create a Review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewForm = () => {
  const [createNewReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { createReview } = await createNewReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      if (createReview.repositoryId) {
        navigate(`/repository/${createReview.repositoryId}`, {
          replace: true,
        });
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
      {({ handleSubmit }) => <ReviewDetailsForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;
