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
  const lang = getCookie("NEXT_LOCALES") || (await getLocale());
  try {
    const query = gql`
    query{
      static_content_texts{ 
        translations(filter: {languages_code: {code: {_eq: "${lang}"}}}) {
          what_we_do_fields_title
          what_we_do_fields_text
        }
      }
      fields{
        translations(filter: {languages_code: {code: {_eq: "${lang}"}}}) {
          content
          title
          excerpt
        }
        image{
          id
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
