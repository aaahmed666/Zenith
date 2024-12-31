import { NextResponse } from 'next/server'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://cms-zenith.treasuredeal.com/graphql',
  cache: new InMemoryCache(),
})

export async function GET(req: Request) {
  try {
    const query = gql`
      query GetCategories {
        posts_categories {
          id
          translations(filter: { languages_code: { code: { _eq: "ar" } } }) {
            title
          }
        }
      }
    `

    const { data } = await client.query({
      query,
    })

    return NextResponse.json({ categories: data.posts_categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
