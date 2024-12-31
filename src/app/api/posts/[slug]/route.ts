import { getCookie } from '@/app/utils/helper/helper'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { getLocale } from 'next-intl/server'

const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'https://cms-zenith.treasuredeal.com/graphql',
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
})

export async function GET(request: Request) {
    const locale = getCookie('NEXT_LOCALES') || (await getLocale())
    const lang = locale === 'ar' ? 'ar' : 'en'
  try {
    const url = new URL(request.url)
    const slug = url.pathname.split('/').pop()

    if (!slug) {
      return new Response(
        JSON.stringify({ message: 'Post slug is required' }),
        {
          status: 400,
        }
      )
    }

    // const query = gql`
    //   query post($id: ID!) {
    //     posts_by_id(id: $id) {
    //       id
    //       slug
    //       translations {
    //         title
    //         content
    //       }
    //     }
    //   }
    // `
    const query = gql`
      query post_by_slug($slug: String) {
        posts(filter: { slug: { _eq: $slug } }, limit: 1) {
          id
          slug
          comments {
            comment
            email
            name
          }
          translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
            title
            content
            excerpt
          }
          image {
            id
          }
          date_created
          categoryies: post_category {
            data: posts_categories_id {
              id
              translations(
                filter: { languages_code: { code: { _eq: "${lang}" } } }
              ) {
                title
              }
            }
          }
        }
      }
    `

    const { data } = await client.query({
      query,
      variables: { slug },
    })

    if (!data.posts || data.posts.length === 0) {
      return new Response(JSON.stringify({ message: 'Post not found' }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify(data.posts[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Failed to fetch post details',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
