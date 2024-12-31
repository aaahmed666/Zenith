"use client";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
interface Translations {
  languages_code: { code: string };
  title: string;
  excerpt: string;
  content: string;
}

interface Translation {
  languages_code: { code: string };
  what_we_do_fields_title: string;
  what_we_do_fields_text: string;
}

interface Service {
  translations: Translations[];
  image: { id: string };
}

interface StaticContentTexts {
  translations: Translation[];
}

interface Schema {
  fields: Service[];
  static_content_texts: StaticContentTexts;
}

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

export default function FieldsSection() {
  const t = useTranslations();
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/fieldsSection");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch fields details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const staticContent =
    data?.static_content_texts?.translations?.[0] || ({} as Translation);

  const fields =
    data?.fields?.map((item) => ({
      icon: `${BASE_URL}/assets/${item?.image?.id}`,
      title: item?.translations?.[0]?.title,
      description: item?.translations?.[0]?.excerpt,
    })) ?? [];

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
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: ["25px", "40px"],
            fontWeight: "600",
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
              fill="#0000FE"
            />
          </svg>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: ["25px", "40px"],
              fontWeight: "600",
              color: theme.customColors.text,
            }}
            style={{ marginInlineStart: "15px" }}
          >
            {staticContent?.what_we_do_fields_title ?? ""}
          </Typography>
        </Typography>

        <Typography
          variant="h2"
          sx={{
            my: 3,
            mx: "auto",
            lineHeight: "33.6px",
            fontSize: ["12px", "24px"],
            fontWeight: "400",
            color: theme.customColors.text,
            textAlign: "center",
            mb: 12,
          }}
        >
          {staticContent?.what_we_do_fields_text ?? ""}
        </Typography>

        <Grid
          container
          spacing={8}
        >
          {fields?.map((field, i) => (
            <Grid
              size={4}
              key={i}
            >
              <Box
                sx={{
                  position: "relative",
                  mx: { md: "auto" },
                  textAlign: "center",
                  bgcolor: "transparent",
                  border: "1px solid",
                  borderImageSource:
                    "linear-gradient(180deg, #8411E6 0%, #0000FE 100%)",
                  borderImageSlice: 1,
                  color: theme.palette.secondary.main,
                  width: { xs: "300px", md: "350px" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Box
                  height="150px"
                  sx={{
                    mx: { xs: "auto" },
                  }}
                >
                  <Image
                    width="280"
                    height="180"
                    style={{
                      position: "absolute",
                      top: "-30px",
                      marginInlineStart: "50%",
                      transform: "translateX(-50%)",
                      zIndex: "99",
                      margin: "auto",
                    }}
                    src={field?.icon}
                    alt=""
                  />
                </Box>
                <Box sx={{ px: 0, flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: ["10px", "20px"],
                      fontWeight: 600,
                      color: theme.customColors.text,
                      mb: 2,
                    }}
                  >
                    {field?.title}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: ["7px", "16px"],
                      fontWeight: 300,
                      color: theme.customColors.text,
                      mb: 2,
                    }}
                  >
                    {field?.description ?? ""}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    bgcolor: theme.customColors.primary,
                    color: theme.palette.secondary.main,
                    px: 3,
                    py: 1,
                    fontSize: ["7px", "16px"],
                    fontWeight: 600,
                  }}
                >
                  {t("Get_in_touch")}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
