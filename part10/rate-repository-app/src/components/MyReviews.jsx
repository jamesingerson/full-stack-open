import useMe from "../hooks/useMe";
import { FlatList, View } from "react-native";
import theme from "../theme";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const ItemSeparator = () => <View style={theme.separator} />;

const MyReviews = () => {
  const { me, refetch } = useMe({ includeReviews: true });

  if (!me) return <Text>Loading Reviews...</Text>;

  const reviews = me.reviews ? me.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          key={item.id}
          review={item}
          myReviews={true}
          refetch={refetch}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
