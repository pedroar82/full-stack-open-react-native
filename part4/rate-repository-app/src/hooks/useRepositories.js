import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (first, orderBy, orderDirection, searchKeyword) => {
  const variables = { first, orderBy, orderDirection, searchKeyword }
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = data?.repositories.pageInfo.hasNextPage;
   
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
  }
}

export default useRepositories
