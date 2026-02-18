import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

  const useRepository = (first, id) => {
    const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: { id, first },
    })

    const handleFetchMore = () => {
      const canFetchMore = data?.repository?.reviews?.pageInfo.hasNextPage

      if (!canFetchMore) {
        return
      }

      fetchMore({
        variables: {
          id,
          first,
          after: data.repository.reviews.pageInfo.endCursor,
        },
      })
    }

    return {
      repository: data?.repository,
      fetchMore: handleFetchMore,
      loading,
      error,
    }
  }
  
  export default useRepository