import { GRAPHQL_URI } from '@/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache()
});

export default client;