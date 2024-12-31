"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Loader from "../Loader/Loader";

interface Video {
  languages_code: { code: string };
  headline: string;
  text: string;
  sub_headline: string;
  button_text: string;
}

interface Schema {
  home_page: { video: Video[]; video_url: string };
}

export default function HeroSection() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch hero details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <Container>
      <Grid
        container
        sx={{ py: 12 }}
        spacing={6}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid size={{ xs: 12, xl: 6 }}>
          <Box
            display="flex"
            alignItems="center"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                fill="#0000FE"
              />
            </svg>
            <Typography
              variant="h4"
              sx={{
                paddingInlineStart: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                color: theme.customColors.text,
                fontSize: ["20px", "40px"],
              }}
            >
              {data?.home_page?.video?.[0]?.headline ?? ""}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              my: 3,
              fontWeight: 400,
              color: theme.customColors.text,
              fontSize: ["12px", "20px"],
            }}
          >
            {data?.home_page?.video?.[0]?.text ?? ""}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              my: 3,
              fontWeight: 600,
              color: theme.customColors.text,
              fontSize: ["12px", "20px"],
            }}
          >
            {data?.home_page?.video?.[0]?.sub_headline ?? ""}
          </Typography>
          <Button
            endIcon={
              <ArrowRightAltIcon
                fontSize="large"
                sx={{ fontSize: "35px" }}
              />
            }
            variant="text"
            sx={{
              my: 2,
              fontWeight: 500,
              color: theme.customColors.primary,
              fontSize: ["15px", "24px"],
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            href="#contact"
          >
            {data?.home_page?.video?.[0]?.button_text ?? ""}
          </Button>
        </Grid>

        <Grid size={{ xs: 12, xl: 6 }}>
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="grey.300"
            sx={{ height: { xs: 300, md: 500 } }}
          >
            <iframe
              width="100%"
              height="100%"
              src={data?.home_page?.video_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
