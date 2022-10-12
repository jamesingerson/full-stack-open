import Text from "./Text";
import { format, parseISO } from "date-fns";
import { StyleSheet, View, Pressable, Alert } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  rating: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "center",
  },
  ratingContainer: {
    margin: 10,
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  textContainer: {
    flexGrow: 1,
    flex: 1,
    marginRight: 80,
  },
  buttonsContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const ReviewItem = ({ review, myReviews = false, refetch }) => {
  let navigate = useNavigate();
  const onPress = (id) => navigate(`/repository/${id}`);
  const [deleteReview] = useDeleteReview();

  const createDeleteAlert = (deleteReviewId) => {
    console.log(deleteReviewId);
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled Deletion"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            console.log("Confirmed Deletion");
            console.log(deleteReviewId);
            await deleteReview({ deleteReviewId });
            refetch();
          },
        },
      ]
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{ marginVertical: 3 }} fontWeight={"bold"}>
            {myReviews ? review.repository.fullName : review.user.username}
          </Text>
          <Text style={{ marginVertical: 3 }} color={"textSecondary"}>
            {format(parseISO(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <View style={styles.textContainer}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      {myReviews && (
        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => onPress(review.repository.id)}>
            <Text style={theme.button}>View Repository</Text>
          </Pressable>
          <Pressable onPress={() => createDeleteAlert(review.id)}>
            <Text style={theme.deleteButton}>Delete Review</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default ReviewItem;
