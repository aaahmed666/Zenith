"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Sliders from "../Slider/Slider";
import Grid from "@mui/material/Grid2";
import Loader from "../Loader/Loader";
interface Translations {
  languages_code: { code: string };
  title: string;
  excerpt: string;
  our_services_title: string;
  our_services_text: string;
}

interface Service {
  translations: Translations[];
  icon: { id: string };
}

interface StaticContentTexts {
  translations: Translations[];
}

interface Schema {
  services: Service[];
  static_content_texts: StaticContentTexts;
}

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

export default function ServicesSection() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch services details: ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const staticContent =
    data?.static_content_texts?.translations?.[0] || ({} as Translations);

  const services = data?.services?.map((item) => ({
    icon: `${BASE_URL}/assets/${item?.icon?.id}`,
    title: item?.translations?.[0]?.title,
    description: item?.translations?.[0]?.excerpt,
  }));

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
      py={8}
      bgcolor={theme.customColors.accent}
      color={theme.palette.secondary.main}
      textAlign="center"
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          marginBottom={4}
        >
          <Box sx={{ marginInlineEnd: "10px" }}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                fill="#0000FE"
              />
            </svg>
          </Box>
          <Typography
            sx={{
              fontSize: ["20px", "40px"],
              fontWeight: 600,
              color: theme.palette.secondary.main,
            }}
            variant="h4"
          >
            {staticContent?.our_services_title ?? ""}
          </Typography>
        </Box>

        <Typography
          variant="h1"
          marginBottom={4}
          sx={{
            mx: "auto",
            color: theme.customColors.navbar,
            fontSize: ["12px", "24px"],
            lineHeight: "31px",
            fontWeight: 400,
          }}
        >
          {staticContent?.our_services_text ?? ""}
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center", my: 2 }}
        >
          <Sliders services={services} />
        </Grid>
      </Container>
    </Box>
  );
}
