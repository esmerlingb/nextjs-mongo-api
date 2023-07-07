import apolloClient from '@/service_providers/graphql/apollo_client'
import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'

export default function MyApp ({ Component, pageProps }: AppProps): ReactElement | null {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps}/>
    </ApolloProvider>
  )
}