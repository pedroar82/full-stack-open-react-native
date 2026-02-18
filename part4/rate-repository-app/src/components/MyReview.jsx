import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import useMe from '../hooks/useMe';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
   separator: {
    height: 10,
  },
})

const MyReview = () => {
  const { user, loading } = useMe(true)

 if (loading) return <Text>Loading...</Text>;
  if (!user) return <Text>Please sign in...</Text>;
  
  const reviews = user?.reviews?.edges
    ? user?.reviews?.edges.map((edge) => edge.node)
    : []

  const ItemSeparator = () => <View style={styles.separator} />

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}


export default MyReview