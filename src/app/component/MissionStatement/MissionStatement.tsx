"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MissionCard from "../../MissionCardProps/MissionCardProps";
import Loader from "../Loader/Loader";

interface Translations {
  languages_code: { code: string };
  title: string;
  text: string;
  our_mission_title: string;
}

interface Mission {
  translations: Translations[];
}
interface StaticContentTexts {
  translations: Translations[];
}

interface Schema {
  mission: Mission[];
  static_content_texts: StaticContentTexts;
}

export default function MissionStatement() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/mission");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch mission statement details.");
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

  const staticContent =
    data?.static_content_texts?.translations?.[0] || ({} as Translations);

  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: theme.customColors.accent,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: ["20px", "40px"],
              fontWeight: 600,
              mx: "auto",
              color: theme.palette.secondary.main,
              textTransform: "uppercase",
            }}
          >
            {staticContent?.our_mission_title ?? ""}
          </Typography>

          <Grid
            container
            justifyContent="center"
            sx={{ display: "flex", mt: 4, mx: "auto" }}
            spacing={3}
          >
            {data?.mission?.map((item, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={index}
              >
                <MissionCard
                  title={item.translations[0]?.title}
                  description={item.translations[0]?.text}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
