import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://cms-zenith.treasuredeal.com/graphql',
  cache: new InMemoryCache(),
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const query = gql`
      mutation {
        create_posts_comments_item(
          data: {
            comment: "${data.comment}"
            name: "${data.name}"
            email: "${data.email}"
            post_id: {id: "2145dec5-6d9e-4890-892e-6e1a7f5aab58"}
          }
        )
      }
    `

    const result = await client.mutate({
      mutation: query,
    })

    return new Response(JSON.stringify({ success: true, data: result.data }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error sending message:', error)
  }
}
