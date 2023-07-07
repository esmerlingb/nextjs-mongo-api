import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server'
import createGraphqlServer from '@/service_providers/graphql/create_graphql_server'

export default startServerAndCreateNextHandler<NextRequest>(await createGraphqlServer())
