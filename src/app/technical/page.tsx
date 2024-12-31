"use client";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../component/Header/Header.module.css";
import Loader from "../component/Loader/Loader";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

interface Translations {
  languages_code: { code: string };
  title: string;
  excerpt: string;
  content: string;
  our_services_page_title: string;
  our_services_title: string;
  our_services_text: string;
  our_services_page_discover_text_3: string;
  our_services_page_discover_text_2: string;
  our_services_page_discover_text_1: string;
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

export default function Technical() {
  const t = useTranslations();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/techincal");
      const data = await res.json();
      setData(data?.data);
      console.log(data, "sssssssss");
    } catch (err) {
      setError("Failed to technical details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const staticContent =
    data?.static_content_texts?.translations?.[0] || ({} as Translations);

  const service =
    data?.services.map((item) => ({
      icon: `${BASE_URL}/assets/${item.icon?.id}`,
      title: item.translations[0]?.title,
      description: item.translations[0]?.excerpt,
      link: item.translations[0]?.content,
    })) ?? [];

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          height: { xs: "40vh", md: "100vh" },
          py: 12,
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
            fontSize: ["30px", "50px"],
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
          {staticContent.our_services_page_title ?? ""}
        </Button>
      </Box>

      <Box sx={{ py: 12 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
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
              variant="h4"
              sx={{
                color: theme.customColors.text,
                fontSize: ["25px", "40px"],
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {staticContent?.our_services_title ?? ""}
            </Typography>
          </Box>

          <Typography
            variant="h2"
            marginBottom={3}
            sx={{
              mx: "auto",
              color: theme.customColors.text,
              fontSize: ["12px", "24px"],
              fontWeight: "400",
              lineHeight: "33px",
              mb: 2,
              textAlign: "center",
            }}
          >
            {staticContent?.our_services_text ?? ""}
          </Typography>

          <Box
            sx={{
              py: 2,
              textAlign: "center",
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    style={{
                      fontSize: isMobile ? "20px" : "40px",
                      marginBottom: "16px",
                      fontWeight: 800,
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    style={{
                      fontWeight: 800,
                      fontSize: isMobile ? "17px" : "35px",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: isMobile ? "15px" : "30px",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    style={{
                      fontSize: isMobile ? "9px" : "18px",
                      lineHeight: 1.8,
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    style={{
                      textDecoration: "underline",
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      color: theme.customColors.primary,
                      fontSize: isMobile ? "8px" : "16px",
                    }}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    style={{
                      paddingInlineEnd: "1.5em",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    style={{
                      fontSize: isMobile ? "9px" : "18px",
                      marginBottom: "8px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {staticContent?.our_services_page_discover_text_1 ?? ""}
            </ReactMarkdown>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{ marginBottom: "15px" }}
          >
            {service?.map((service, i) => (
              <Grid
                key={i}
                size={{ xs: 12, xl: 4 }}
              >
                <Card
                  sx={{
                    bgcolor: "transparent",
                    border: "1px solid",
                    borderImageSource:
                      "linear-gradient(180deg, #8411E6 0%, #0000FE 100%)",
                    borderImageSlice: 1,
                    color: theme.palette.secondary.main,
                    boxSizing: "border-box",
                    minHeight: "350px",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ margin: "8px auto" }}>
                    <Image
                      width="100"
                      height="100"
                      style={{
                        margin: "8px auto",
                      }}
                      src={service?.icon}
                      alt=""
                    />
                  </Box>
                  <Box sx={{ px: 0, flexGrow: 1 }}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontWeight: 600,
                        textTransform: "uppercase",
                        mb: 2,
                        color: theme.customColors.text,
                        fontSize: ["12px", "24px"],
                        textAlign: "center",
                      }}
                    >
                      {service?.title ?? ""}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        py: [0, 4],
                        fontWeight: 300,
                        fontSize: ["10px", "20px"],
                        color: theme.customColors.text,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      {service?.description ?? ""}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        py: [1, 2],
                        fontSize: ["7px", "16px"],
                        fontWeight: 500,
                        color: theme.customColors.primary,
                        textAlign: "center",
                      }}
                    >
                      {service?.link ?? ""}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      bgcolor: theme.customColors.primary,
                      color: theme.palette.secondary.main,
                      textTransform: "none",
                      mt: [0, 2],
                    }}
                  >
                    {t("Inqure_Now")}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              py: 2,
              textAlign: "center",
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    style={{
                      fontSize: isMobile ? "20px" : "40px",
                      marginBottom: "16px",
                      fontWeight: 800,
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    style={{
                      fontWeight: 800,
                      fontSize: isMobile ? "17px" : "35px",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: isMobile ? "15px" : "30px",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    style={{
                      fontSize: isMobile ? "9px" : "18px",
                      lineHeight: 1.8,
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    style={{
                      textDecoration: "underline",
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      color: theme.customColors.primary,
                      fontSize: isMobile ? "8px" : "16px",
                    }}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    style={{
                      paddingInlineEnd: "1.5em",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    style={{
                      fontSize: isMobile ? "9px" : "18px",
                      marginBottom: "8px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {staticContent?.our_services_page_discover_text_2 ?? ""}
            </ReactMarkdown>
          </Box>
          <Box sx={{ py: 2, textAlign: "center" }}>
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    style={{
                      fontSize: isMobile ? "20px" : "40px",
                      marginBottom: "16px",
                      fontWeight: 800,
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    style={{
                      fontWeight: 800,
                      fontSize: isMobile ? "17px" : "35px",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: isMobile ? "15px" : "30px",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    style={{
                      fontSize: isMobile ? "9px" : "18px",
                      lineHeight: 1.8,
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    style={{
                      textDecoration: "underline",
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      color: theme.customColors.primary,
                      fontSize: isMobile ? "8px" : "16px",
                    }}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    style={{
                      paddingInlineEnd: "1.5em",
                      marginBottom: "16px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    style={{
                      fontSize: isMobile ? "9px" : "18px",
                      marginBottom: "8px",
                      fontFamily: "Poppins",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {staticContent?.our_services_page_discover_text_3 ?? ""}
            </ReactMarkdown>
          </Box>
        </Container>
      </Box>
    </>
  );
}
