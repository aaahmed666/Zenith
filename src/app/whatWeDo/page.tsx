"use client";
import { Box, Typography, useTheme, Container, Button } from "@mui/material";
import styles from "../component/Header/Header.module.css";
import ServicesSection from "../component/ServicesSection/ServicesSection";
import FieldsSection from "../component/FieldsSection/FieldsSection";
import MakesDifferent from "../component/MakesDifferent/MakesDifferent";
import { useEffect, useState } from "react";
import Loader from "../component/Loader/Loader";

interface Translations {
  languages_code: { code: string };
  what_we_do_title: string;
  what_we_do_text: string;
}

interface StaticContentTexts {
  translations: Translations[];
}

interface Schema {
  static_content_texts: StaticContentTexts;
}

export default function whatWeDo() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/whatWeDo");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to what we do details.");
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
    <>
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
          <Box sx={{ pt: { xs: 9 } }}>
            {(loading || error) && (
              <Loader
                loading={loading}
                error={error}
              />
            )}
            <Button
              sx={{
                my: 9,
                color: theme.palette.secondary.main,
                fontSize: { xs: "40px", md: "50px" },
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
              {staticContent?.what_we_do_title ?? ""}
            </Button>
            <Typography
              variant="h2"
              sx={{
                my: 5,
                mx: "auto",
                color: theme.customColors.secondary,
                fontSize: { xs: "16px", md: "24px" },
                fontWeight: 400,
                lineHeight: "33.6px",
              }}
            >
              {staticContent?.what_we_do_text ?? ""}
            </Typography>
          </Box>
        </Container>
      </Box>

      <FieldsSection />
      <MakesDifferent />
      <ServicesSection />
    </>
  );
}
