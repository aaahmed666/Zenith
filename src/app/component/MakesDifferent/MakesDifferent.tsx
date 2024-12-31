"use client";
import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

interface Translations {
  languages_code: { code: string };
  what_we_do_fields_content_title: string;
  what_we_do_fields_content_text: string;
}

interface StaticContentTexts {
  translations: Translations[];
}

interface Schema {
  static_content_texts: StaticContentTexts;
}

export default function MakesDifferent() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/makesDifferent");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch make different details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const staticContent =
    data?.static_content_texts?.translations?.[0] || ({} as Translations);

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
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={8}
      bgcolor={theme.customColors.accent}
    >
      <Container>
        <Box marginBottom={4}>
          <Typography
            variant="h6"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              my: 4,
              color: theme.palette.secondary.main,
              fontSize: ["20px", "40px"],
              fontWeight: 600,
              lineHeight: "56px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                fill="#DAFF23"
              />
            </svg>
            <Typography
              variant="h6"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                mx: 2,
                color: theme.palette.secondary.main,
                fontSize: ["20px", "40px"],
                fontWeight: 600,
                lineHeight: "56px",
                textAlign: "center",
              }}
            >
              {staticContent?.what_we_do_fields_content_title ?? ""}
            </Typography>
            <svg
              width="48"
              height="48"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                fill="#DAFF23"
              />
            </svg>
          </Typography>

          <Typography
            variant="h2"
            sx={{
              mx: "auto",
              my: 4,
              color: theme.palette.secondary.main,
              fontSize: ["18px", "24px"],
              fontWeight: 400,
              lineHeight: "33.6px",
              textAlign: "center",
            }}
          >
            {staticContent?.what_we_do_fields_content_text ?? ""}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
