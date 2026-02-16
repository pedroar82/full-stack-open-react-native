import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native'
import useMe from '../hooks/useMe';
import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
    container: {
    flex: 1,
   // marginTop: StatusBar.currentHeight || 0,
  },
});

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {

  const navigate = useNavigate()

  const { user } = useMe();
  if (!user) return <Text>Please sign in...</Text>;

  const repositoryNodes = repositories?.edges
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/${item.id}`)}
        >
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  )
};


const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return <RepositoryListContainer repositories={data.repositories} />;
}

export default RepositoryList;