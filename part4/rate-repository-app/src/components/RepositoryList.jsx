import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native'
import useMe from '../hooks/useMe';
import  { useState, memo } from 'react';
import OrderReposHeader from './OrderReposHeader';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
    container: {
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />

const ListHeader = memo(
  ({ selectedSorting, setSorting, searchKeyword, setSearchKeyword }) => (
    <OrderReposHeader
      selectedSorting={selectedSorting}
      setSorting={setSorting}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  ),
)

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  setSorting,
  selectedSorting,
  searchKeyword,
  setSearchKeyword,
}) => {
  const navigate = useNavigate()

  const { user } = useMe()
  if (!user) return <Text>Please sign in...</Text>

  const repositoryNodes = repositories?.edges
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <ListHeader
          selectedSorting={selectedSorting}
          setSorting={setSorting}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  )
}


const RepositoryList = () => {
  const [sorting, setSorting] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  })

  const [searchKeyword, setSearchKeyword] = useState('')
  const [value] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore, loading, error } = useRepositories(
    2,
    sorting.orderBy,
    sorting.orderDirection,
    value,
  )

  //if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const onEndReach = () => {
     console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      setSorting={setSorting}
      selectedSorting={sorting}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  )
}

export default RepositoryList;