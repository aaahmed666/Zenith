"use client";
import { Box, CardMedia, Container, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

interface Translations {
  languages_code: { code: string };
  name: string;
  position: string;
}

interface Team {
  translations: Translations[];
  image: { id: string };
}

interface Schema {
  team: Team[];
}
export default function Leadership() {
  const t = useTranslations();
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/leaderShip");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch leadership details.");
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
    <Box
      display="flex"
      sx={{ py: 12 }}
    >
      <Container>
        <Typography
          mb={6}
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
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
              fill="#8411E6"
            />
          </svg>
          <Typography
            sx={{
              marginInlineStart: "15px",
              fontWeight: 600,
              fontSize: ["20px", "40px"],
              color: theme.customColors.text,
            }}
            variant="h2"
          >
            {t("leader.LEADERSHIP_TEAM")}
          </Typography>
        </Typography>

        <Grid
          container
          spacing={5}
          sx={{ mt: 2, justifyContent: "center", mx: "auto" }}
        >
          {data?.team?.map((member, index) => {
            const wrapColors = [
              theme.customColors.button,
              theme.palette.primary.main,
              theme.customColors.primary,
            ];
            const bgColor = wrapColors[index % wrapColors.length];

            return (
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{ mx: "auto", justifyContent: "center" }}
                key={index}
              >
                <Box sx={{ color: "red" }}>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={`${BASE_URL}/assets/${member.image.id}`}
                      alt={member.translations[0].name}
                    />
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: bgColor,
                        position: "absolute",
                        insetInlineStart: "-15px",
                        bottom: "-15px",
                        zIndex: "-1",
                      }}
                    ></Box>
                  </Box>

                  <Box sx={{ mt: 5 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.customColors.text,
                        fontSize: ["12px", "24px"],
                      }}
                    >
                      {member.translations[0].name ?? ""}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 500,
                        color: theme.customColors.leader,
                        fontSize: ["9px", "18px"],
                      }}
                    >
                      {member.translations[0].position ?? ""}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
