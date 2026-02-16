import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from "./RepositoryItem"
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../../theme'
import * as Linking from 'expo-linking';

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
})

const RepositorySingleItem = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  })

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data?.repository;

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


export default RepositorySingleItem