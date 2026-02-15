import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useMe = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  })

  return {
    user: data?.me,
    loading,
    error,
  }
}

export default useMe
