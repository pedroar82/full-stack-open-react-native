import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native'
import useMe from '../hooks/useMe';
import  { useState } from 'react';
import OrderReposHeader from './OrderReposHeader';
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

export const RepositoryListContainer = ({ repositories, setSorting, selectedSorting }) => {

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
      ListHeaderComponent={
        <OrderReposHeader 
          selectedSorting={selectedSorting} 
          setSorting={setSorting} 
        />
      }
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

  const [sorting, setSorting] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  })

  const { repositories, loading, error } = useRepositories(
    sorting.orderBy,
    sorting.orderDirection,
  )

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return <RepositoryListContainer repositories={repositories} setSorting={setSorting} selectedSorting={sorting}/>;
}

export default RepositoryList;