import promiseResolver from '@/service_providers/graphql/promise_resolver'
import { userController } from '../controllers'

const resolvers = {
  Query: {
    users: promiseResolver(userController.getUsers)
  },
  Mutation: {
    upsertUser: promiseResolver(userController.upsertUser)
  }
}

export default resolvers