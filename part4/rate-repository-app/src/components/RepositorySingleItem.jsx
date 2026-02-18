import { View, Text, Pressable, StyleSheet, FlatList,Image } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from "./RepositoryItem"
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../../theme'
import * as Linking from 'expo-linking';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingBottom: 10,
    flex: 1,
  },
  fullName: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 10,
  },
   text: {
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.body,
    paddingBottom: 10,
  },
   separator: {
    height: 10,
  },
})

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e1e4e8' }}>
      <RepositoryItem item={repository} />
      <View style={{ backgroundColor: 'white' }}>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} /> 


const RepositorySingleItem = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  })

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data?.repository;
  const reviews  = repository?.reviews?.edges
    ? repository?.reviews?.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <View style={styles.separator} />
        </>
      )}
    />
  )
}


export default RepositorySingleItem