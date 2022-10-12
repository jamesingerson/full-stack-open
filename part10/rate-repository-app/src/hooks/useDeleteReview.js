import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ deleteReviewId }) => {
    const { data } = await mutate({
      variables: {
        deleteReviewId,
      },
    });
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
