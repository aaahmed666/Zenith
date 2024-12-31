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

export async function POST(req: Request) {
  const locale = getCookie("NEXT_LOCALES") || (await getLocale());
  const lang = locale === "ar" ? "ar" : "en";
  try {
    const { date, categoryId, page } = await req.json();
    const pageNumber = Number(page) > 0 ? Number(page) : 1;

    const querys = gql`
      query PostsFilter($gte: String, $lte: String, $id: String, $page: Int) {
        posts_aggregated(
          filter: {
            date_created: { _gte: $gte, _lte: $lte }
            post_category: { posts_categories_id: { id: { _eq: $id } } }
          }
        ) {
          count {
            id
          }
        }

        posts(
          page: $page
          limit: 1
          filter: {
            date_created: { _gte: $gte, _lte: $lte }
            post_category: { posts_categories_id: { id: { _eq: $id } } }
          }
        ) {
          id
          slug
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
    `;

    const filterQuery = gql`
      query PostsFilter {
        posts(page: 1) {
          id
          slug
          translations(
            filter: { languages_code: { code: { _eq: "${lang}" } } }
          ) {
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
    `;

    let query = filterQuery;
    let variables = {};

    if (date && categoryId) {
      query = querys;
      variables = {
        gte: `${date}T00:00:00Z`,
        lte: `${date}T23:59:59Z`,
        id: categoryId,
        page: pageNumber,
      };
    } else if (date) {
      query = querys;
      variables = {
        gte: `${date}T00:00:00Z`,
        lte: `${date}T23:59:59Z`,
        id: null,
        page: pageNumber,
      };
    } else if (categoryId) {
      query = querys;
      variables = {
        gte: null,
        lte: null,
        id: categoryId,
        page: pageNumber,
      };
    }

    const { data } = await client.query({
      query,
      variables,
    });

    return NextResponse.json({
      posts: data?.posts,
      aggregatedCount: data?.posts_aggregated?.[0]?.count?.id || 0,
    });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
