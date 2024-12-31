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
        create_contact_us_messages_item(
          data: {
            email: "${data.email}"
            message: "${data.message}"
            first_name: "${data.first_name}"
            last_name: "${data.last_name}"
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
