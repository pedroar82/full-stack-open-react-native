import { StatusBar } from 'expo-status-bar'
import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './utils/apolloClient';
const apolloClient = createApolloClient();

import Main from './components/Main'

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>

      <StatusBar style="auto" />
    </>
  )
}
