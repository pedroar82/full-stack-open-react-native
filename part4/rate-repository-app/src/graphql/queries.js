import { gql } from '@apollo/client'

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

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      createdAt
      description
      forksCount
      fullName
      id
      language
      stargazersCount
      url
      name
      openIssuesCount
      ownerAvatarUrl
      ownerName
      ratingAverage
      reviewCount
      watchersCount
      userHasReviewed
    }
  }
`