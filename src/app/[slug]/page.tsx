import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Box, Button, Container } from "@mui/material";
import { getCookie } from "@/app/utils/helper/helper";
import { getLocale } from "next-intl/server";
import styles from "../component/Header/Header.module.css";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const lang = getCookie("NEXT_LOCALES") || (await getLocale());

  const { data } = await client.query({
    query: gql`
      query {
        pages(filter: { slug: { _eq: "${slug}" } }, limit: 1) {
          slug
          id
          translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
            title
            content
          }
        }
      }
    `,
  });

  if (!data.pages || data.pages.length === 0) {
    notFound();
  }

  const page = data?.pages[0];
  const { title, content } = page?.translations[0];

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", textAlign: "center" }}
        className={styles.headerPage}
      >
        <Button
          sx={{
            color: "#fff",
            fontSize: "50px",
            fontWeight: 600,
            lineHeight: "56px",
            position: "relative",
            textDecoration: "none",
            textTransform: "uppercase",
            background:
              "linear-gradient(to right, #FDFDFD, #FDFDFD, #0000FE, #0000FE )",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            "&::after": {
              content: '""',
              position: "absolute",
              insetInlineStart: 0,
              bottom: "-5px",
              width: "100%",
              height: "2px",
              backgroundColor: "#8411E6",
              transform: "scaleX(0)",
              transformOrigin: "bottom right",
              transition: "transform 0.3s ease",
            },
            "&:hover::after": {
              transform: "scaleX(1)",
              transformOrigin: "bottom left",
            },
          }}
        >
          {title}
        </Button>
      </Box>

      <Container>
        <Box sx={{ py: 10 }}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  style={{
                    fontSize: "40px",
                    marginBottom: "16px",
                    fontWeight: 800,
                    fontFamily: "Poppins",
                  }}
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  style={{
                    fontWeight: 800,
                    fontSize: "35px",
                    marginBottom: "16px",
                    fontFamily: "Poppins",
                  }}
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "30px",
                    marginBottom: "16px",
                    fontFamily: "Poppins",
                  }}
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                    fontFamily: "Poppins",
                  }}
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  style={{
                    textDecoration: "underline",
                    fontWeight: 600,
                    fontFamily: "Poppins",
                  }}
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  style={{
                    paddingInlineEnd: "1.5em",
                    marginBottom: "16px",
                    fontFamily: "Poppins",
                  }}
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  style={{
                    fontSize: "18px",
                    marginBottom: "8px",
                    fontFamily: "Poppins",
                  }}
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Container>
    </>
  );
}
