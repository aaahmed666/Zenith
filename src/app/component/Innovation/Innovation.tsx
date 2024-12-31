"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import Loader from "../Loader/Loader";

interface Translations {
  languages_code: { code: string };
  title: string;
  content: string;
}

interface Page {
  translations: Translations[];
}

interface Schema {
  about: Page;
}

export default function Innovation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/innovation");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch innovation details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const title = data?.about?.translations[0]?.title;
  const content = data?.about?.translations[0]?.content;

  if (loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <Box
      bgcolor={theme.customColors.accent}
      sx={{ p: { xs: 3, md: 7 }, px: { md: 10 } }}
    >
      <Container>
        {title && content && (
          <Box sx={{ py: 6 }}>
            <Typography sx={{ color: theme.palette.secondary.main }}>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: theme.palette.secondary.main,
                        fontWeight: 800,
                        fontSize: isMobile ? "10px" : "20px",
                        marginBottom: "16px",
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    >
                      <h1
                        style={{
                          marginInlineEnd: "10px",
                          fontFamily: "Poppins",
                        }}
                      >
                        {props.children}
                      </h1>
                      <svg
                        width={isMobile ? "24" : "48"}
                        height={isMobile ? "24" : "48"}
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                          fill="#8411E6"
                        />
                      </svg>
                    </div>
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      style={{
                        fontWeight: 800,
                        fontSize: isMobile ? "17px" : "35px",
                        marginBottom: "16px",
                        color: theme.customColors.divider,
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      style={{
                        color: theme.customColors.divider,
                        fontWeight: 800,
                        fontSize: isMobile ? "15px" : "30px",
                        marginBottom: "16px",
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      style={{
                        color: theme.palette.secondary.main,
                        fontSize: isMobile ? "9px" : "18px",
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
                        color: theme.customColors.divider,
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
                        color: theme.palette.secondary.main,
                        fontSize: isMobile ? "9px" : "18px",
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
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
