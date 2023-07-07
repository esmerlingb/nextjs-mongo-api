import Link from 'next/link'

export default function Home () {
  return (
    <div>
      <h1>Hello, this is an example API to retrieve data using graphql</h1>
      <p>To the te API go to <Link href="/api/graphql">Apollo Studio</Link> or use Postman</p>
    </div>
  )
}
