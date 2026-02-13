import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          id
          language
          name
          ownerName
          ownerAvatarUrl
          url
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
 `