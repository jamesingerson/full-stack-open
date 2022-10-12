import Text from "./Text";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, View } from "react-native";
import ReviewItem from "../components/ReviewItem";
import theme from "../theme";

const ItemSeparator = () => <View style={theme.separator} />;

const RepositoryReviews = () => {
  const { id } = useParams();
  const variables = { repoId: id, first: 5 };
  const { repository, fetchMore } = useRepository(variables);

  if (!repository) return <Text>Loading Repository...</Text>;

  // Get the nodes from the edges array
  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem key={item.id} review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showUrlButton={true} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryReviews;
