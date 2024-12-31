"use client";
import { Box, Button, useTheme } from "@mui/material";
import VisionSection from "../component/VisionSection/VisionSection";
import MissionStatement from "../component/MissionStatement/MissionStatement";
import Leadership from "../component/Leadership/Leadership";
import styles from "../component/Header/Header.module.css";
import Innovation from "../component/Innovation/Innovation";
import { useEffect, useState } from "react";
import Loader from "../component/Loader/Loader";

interface Translations {
  languages_code: { code: string };
  title: string;
}

interface Pages {
  translations: Translations[];
}

interface Schema {
  pages: Pages[];
}

export default function About() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/about");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch about details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", textAlign: "center" }}
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
          {data?.pages[2]?.translations?.[0]?.title ?? ""}
        </Button>
      </Box>
      <VisionSection />
      <MissionStatement />
      <Innovation />
      <Leadership />
    </>
  );
}
