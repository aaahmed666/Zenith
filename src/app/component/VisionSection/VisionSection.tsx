"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Container, useTheme, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import VisionCard from "../VisionCard/VisionCard";
import { useTranslations } from "use-intl";
import Loader from "../Loader/Loader";

interface Translations {
  languages_code: { code: string };
  title: string;
  text: string;
  our_vision_title: string;
}

interface Vision {
  translations: Translations[];
}

interface StaticContentTexts {
  translations: Translations[];
}

interface Schema {
  vision: Vision[];
  static_content_texts: StaticContentTexts;
}

interface VisionSectionProps {
  btn?: boolean;
}

export default function VisionSection({ btn = false }: VisionSectionProps) {
  const t = useTranslations();
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/vision");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to vision details.");
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
    <>
      <Container>
        <Box sx={{ py: 12 }}>
          <Box
            mb={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                fill="#8411E6"
              />
            </svg>
            <Typography
              sx={{
                marginInlineStart: "15px",
                fontSize: ["20px", "40px"],
                fontWeight: 600,
                textTransform: "uppercase",
                color: theme.customColors.text,
              }}
              variant="h4"
              textAlign="center"
            >
              {staticContent.our_vision_title ?? ""}
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
          >
            {data?.vision?.map((item, i) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={i}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <VisionCard
                  title={item.translations[0]?.title}
                  description={item.translations[0]?.text}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ width: "100%", mx: "auto", textAlign: "center" }}>
            {btn && (
              <Button
                href="/about"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                  padding: "15px 25px",
                  fontSize: ["10px", "20px"],
                  fontWeight: 600,
                  lineHeight: "22.4px",
                  borderRadius: "0px",
                  px: 5,
                  my: 5,
                  mx: "auto",
                  display: "inline-block",
                  textAlign: "center",
                  textTransform: "none",
                }}
              >
                {t("about.aboutZenith")}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
