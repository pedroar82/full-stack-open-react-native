import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useMe = (includeReviews = false) => {
  const { data, loading, error } = useQuery(ME, {
    variables: {includeReviews},
    fetchPolicy: 'cache-and-network',
  })

  return {
    user: data?.me,
    loading,
    error,
  }
}

export default useMe
