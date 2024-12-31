"use client";
import React, { useEffect, useState } from "react";
import styles from "../../component/Header/Header.module.css";
import { Box, Button, useTheme } from "@mui/material";
import Loader from "../Loader/Loader";

interface Translations {
  languages_code: { code: string };
  posts_page_title: string;
}

interface StaticContentTexts {
  translations: Translations[];
}

interface Schema {
  static_content_texts: StaticContentTexts;
}

export default function HeadBlog() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/headerBlog");
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

  const staticContent =
    data?.static_content_texts?.translations?.[0] || ({} as Translations);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        height: { xs: "30vh", md: "100vh" },
        alignItems: { xs: "end", md: "center" },
        textAlign: "center",
      }}
      className={styles.headerPage}
    >
      {(loading || error) && (
        <Loader
          loading={loading}
          error={error}
        />
      )}
      <Button
        sx={{
          color: theme.palette.secondary.main,
          fontSize: { xs: "30px", md: "50px" },
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
            backgroundColor: theme.palette.primary.main,
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
        {staticContent.posts_page_title ?? ""}
      </Button>
    </Box>
  );
}
