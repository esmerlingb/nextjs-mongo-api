import { ApolloServer } from '@apollo/server'
import { readFileSync } from 'fs'
import gql from 'graphql-tag'
import path from 'path'
import userResolver from '@/users/graphql/user.resolver'

export default async function createGraphqlServer (): Promise<ApolloServer> {
  const userGraphqlFile = readFileSync(path.join(process.cwd(), './src/users/graphql/user.graphql'), "utf-8");

  const typeDefs = [
    gql`
      type Query {
        _empty: String
      }
      type Mutation {
        _empty: String
      }
    `,
    gql(userGraphqlFile)
  ]
  const resolvers = [userResolver]

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  return server
}
