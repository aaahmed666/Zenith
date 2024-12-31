"use client";
import { Container, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

interface Translations {
  languages_code: { code: string };
  contact_us_title: string;
  contact_us_text: string;
  contact_us_form_note: string;
}

interface StaticContentTexts {
  translations: Translations[];
}

interface Schema {
  static_content_texts: StaticContentTexts;
}

export default function ContactFormText() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch contact details.");
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
    <Container sx={{ textAlign: "center" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: ["20px", "40px"],
          fontWeight: 600,
          color: theme.customColors.text,
        }}
      >
        {staticContent?.contact_us_title ?? ""}
      </Typography>

      <Typography
        variant="h1"
        sx={{
          fontSize: ["10px", "20px"],
          fontWeight: 400,
          color: theme.customColors.text,
        }}
        my={2}
      >
        {staticContent?.contact_us_text ?? ""}
      </Typography>

      <Typography
        variant="h1"
        sx={{
          fontSize: ["10px", "20px"],
          fontWeight: 400,
          color: theme.customColors.primary,
        }}
        mb={[3, 6]}
      >
        {staticContent?.contact_us_form_note ?? ""}
      </Typography>
    </Container>
  );
}
