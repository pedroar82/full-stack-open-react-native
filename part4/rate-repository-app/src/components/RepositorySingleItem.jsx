import { View, Text, Pressable, StyleSheet, FlatList,Image } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from "./RepositoryItem"
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../../theme'
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

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
   date: {
    width: '25%',
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#0366d6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0366d6',
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

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View style={{ backgroundColor: 'white', padding: 10 }}>
      <View style={styles.row}>
        <View style={styles.circle}>
            <Text style={styles.circleText}>{review.rating}</Text>
          </View>
        <View style={styles.col}>
          <Text style={styles.fullName}>{review.user.username}</Text>
           <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.text}>{review.text}</Text> 
        </View>
      </View>
    </View>
  )
};

const RepositorySingleItem = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
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