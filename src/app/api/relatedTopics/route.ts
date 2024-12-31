import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { getLocale } from "next-intl/server";
import { getCookie } from "@/app/utils/helper/helper";

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { error: "Missing postId in request" },
      { status: 400 }
    );
  }

  const lang = getCookie("NEXT_LOCALES") || (await getLocale());
  try {
    const query = gql`
      query {
        posts_by_id(id: "${postId}") {
          slug
          image {
            id
          }
          comments {
            id
            name
            comment
            date_created
          }
          translations(
                filter: { languages_code: { code: { _eq: "${lang}"  } } }
              ) {
            title
          }
          related_posts {
            related_posts_id {
              slug
              image {
                id
              }
              translations(
                filter: { languages_code: { code: { _eq: "${lang}"  } } }
              ) {
                title
                excerpt
              }
            }
          }
        }
      }
    `;

    const { data } = await client.query({
      query,
    });

    return NextResponse.json({
      data: data,
    });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
