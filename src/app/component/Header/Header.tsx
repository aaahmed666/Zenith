"use client";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../Header/Header.module.css";
import Loader from "../Loader/Loader";

interface LanguageCode {
  code: string;
}

interface Hero {
  languages_code: LanguageCode;
  headline: string;
  text: string;
  sub_headline: string;
  button_text: string;
}

interface HomePage {
  hero: Hero[];
  hero_button_url: string;
}

interface Schema {
  home_page: HomePage;
}

export default function Header() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/header");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch header details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        pt: 5,
        height: "100vh",
        textAlign: "center",
        alignItems: { sx: "end", md: "center" },
      }}
      className={styles.headerPage}
    >
      <Container>
        {loading || error ? (
          <Loader
            loading={loading}
            error={error}
          />
        ) : (
          <Box>
            <Typography
              variant="h1"
              sx={{
                mt: 9,
                color: theme.palette.secondary.main,
                textTransform: "uppercase",
                fontSize: ["35px", "80px"],
                background:
                  "linear-gradient(to right, #FDFDFD, #FDFDFD, #0000FE, #0000FE )",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {data?.home_page?.hero?.[0]?.headline ?? ""}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                my: 3,
                color: theme.customColors.secondary,
                fontSize: ["25px", "35px"],
                fontWeight: 600,
                lineHeight: "56px",
              }}
            >
              {data?.home_page?.hero?.[0]?.sub_headline ?? ""}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mx: "auto",
                color: theme.customColors.secondary,
                fontSize: ["15px", "24px"],
                fontWeight: 400,
                lineHeight: "33.6px",
              }}
            >
              {data?.home_page?.hero?.[0]?.text ?? ""}
            </Typography>

            <Button
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                padding: "15px 25px",
                fontWeight: "600",
                lineHeight: "22.4px",
                fontSize: ["10px", "16px"],
                my: [3, 5],
              }}
              target="_blank"
              href={data?.home_page?.hero_button_url ?? "#"}
            >
              {data?.home_page?.hero?.[0]?.button_text ?? ""}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
