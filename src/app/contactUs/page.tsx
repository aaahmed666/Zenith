"use client";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Box,
  Typography,
  CardMedia,
  Button,
  IconButton,
  Stack,
  Container,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ContactForm from "../component/ContactForm/ContactForm";
import ContactFormText from "../component/ContactFormText/ContactFormText";
import styles from "../component/Header/Header.module.css";
import Loader from "../component/Loader/Loader";

interface Translations {
  languages_code: { code: string };
  contactus_page_title: string;
  contactus_page_content_title: string;
  contactus_page_content_text: string;
  contact_us_subtitle: string;
  contactus_page_intro: string;
  contactus_page_title_2: string;
}

interface StaticContentTexts {
  translations: Translations[];
}
interface Social {
  url: string;
  name: string;
}
interface SiteSettings {
  socials: Social[];
}
interface Schema {
  static_content_texts: StaticContentTexts;
  site_settings: SiteSettings;
}

export default function ContactUs() {
  const theme = useTheme();
  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/contactUs");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to contact us details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const staticContent =
    data?.static_content_texts?.translations?.[0] || ({} as Translations);

  function getSocialIcon(name: string) {
    switch (name.toLowerCase()) {
      case "facebook":
        return <Facebook sx={{ fontSize: "40px" }} />;
      case "instagram":
        return <Instagram sx={{ fontSize: "40px" }} />;
      case "twitter":
        return <Twitter sx={{ fontSize: "40px" }} />;
      case "linkedin":
        return <LinkedIn sx={{ fontSize: "40px" }} />;
      default:
        return null;
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: { md: "100vh" }, textAlign: "center", pt: { xs: 9 } }}
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
              {staticContent?.contactus_page_title ?? ""}
            </Button>
            <Typography
              variant="h2"
              sx={{
                my: 5,
                mx: "auto",
                color: theme.palette.secondary.main,
                fontSize: { xs: "16px", md: "24px" },
                fontWeight: 400,
                lineHeight: "33.6px",
              }}
            >
              {staticContent?.contactus_page_intro ?? ""}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                my: 5,
                mx: "auto",
                color: theme.palette.secondary.main,
                fontSize: { xs: "16px", md: "25px" },
                fontWeight: 700,
                lineHeight: "33.6px",
              }}
            >
              {staticContent.contactus_page_title_2 ?? ""}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ mx: "auto" }}
            >
              <CardMedia
                component="img"
                image="./LinkedPathGroup.png"
                alt="LinkedPathGroup"
                sx={{ width: "150px" }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 12 }}>
        <ContactFormText />
        <ContactForm />
      </Container>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: theme.customColors.accent,
          textAlign: "center",
          py: 5,
        }}
      >
        <Container>
          <Typography
            variant="h6"
            sx={{
              my: 3,
              color: theme.palette.secondary.main,
              fontSize: { xs: "25px", md: "32px" },
              fontWeight: 600,
              lineHeight: "56px",
            }}
          >
            {staticContent.contactus_page_content_title ?? ""}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              my: 5,
              mx: "auto",
              color: theme.palette.secondary.main,
              fontSize: { xs: "16px", md: "24px" },
              fontWeight: 400,
              lineHeight: "33.6px",
            }}
          >
            {staticContent.contactus_page_content_text ?? ""}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            mb={2}
          >
            {data?.site_settings?.socials?.map((social, index) => (
              <Button
                key={index}
                href={social?.url ?? "#"}
                target="_blank"
                sx={{
                  color: theme.palette.secondary.main,
                  padding: "0px",
                  margin: "0px",
                }}
              >
                <IconButton
                  aria-label={social?.name}
                  color="inherit"
                >
                  {getSocialIcon(social?.name)}
                </IconButton>
              </Button>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
