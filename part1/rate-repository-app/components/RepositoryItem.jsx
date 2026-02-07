import {View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
   content: {
    padding: 16,
    gap: 4,
  },
  });

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.content}>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  )
}

export default RepositoryItem