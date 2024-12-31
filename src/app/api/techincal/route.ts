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
          our_services_page_title
          our_services_title
          our_services_text
          our_services_page_discover_text_3
          our_services_page_discover_text_2
          our_services_page_discover_text_1
        }
      }
      services {
        translations(filter: {languages_code: {code: {_eq: "${lang}"}}}) {
          title
          excerpt
          content
        }
        icon{
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
