"use client";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Phone,
  Twitter,
} from "@mui/icons-material";
import Image from "next/image";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../Loader/Loader";

interface Social {
  url: string;
  name: string;
}

interface Translation {
  footer_statement: string;
  contact_us_text: string;
}

interface SiteSettings {
  logo: { id: string };
  phone: string;
  email: string;
  socials: Social[];
  translations: Translation[];
}

interface Page {
  slug: any;
  translations: {
    title: string;
    content: string;
  }[];
}

interface Schema {
  site_settings: SiteSettings;
  pages: Page[];
}

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState<Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/footer");
      const data = await res.json();
      setData(data?.data);
    } catch (err) {
      setError("Failed to fetch footer details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getSocialIcon(name: string) {
    switch (name.toLowerCase()) {
      case "facebook":
        return <Facebook />;
      case "instagram":
        return <Instagram />;
      case "twitter":
        return <Twitter />;
      case "linkedin":
        return <LinkedIn />;
      default:
        return null;
    }
  }

  return (
    <Box
      component="footer"
      sx={{
        position: "",
        bottom: "0",
        left: 0,
        right: 0,
        backgroundColor: theme.customColors.footer,
        color: theme.palette.secondary.main,
        px: 0,
      }}
    >
      {(loading || error) && (
        <Loader
          loading={loading}
          error={error}
        />
      )}
      <Box sx={{ maxWidth: "100%", px: 0 }}>
        <Box sx={{ py: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={2}
          >
            <Box
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              <Image
                src={`${BASE_URL}/assets/${data?.site_settings?.logo?.id}`}
                alt="Zenith Digital Space Logo"
                width={isMobile ? "200" : "400"}
                height={isMobile ? "150" : "300"}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontSize: ["20px", "40px"],
                fontWeight: 600,
                color: theme.customColors.secondary,
              }}
              textAlign="center"
            >
              {data?.site_settings?.translations?.[0]?.footer_statement ?? ""}
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            mb={2}
          >
            {data?.site_settings?.socials?.map(
              (social: Social, index: number) => (
                <Button
                  className="ancohor"
                  key={index}
                  href={social?.url ?? "#"}
                  target="_blank"
                  sx={{
                    padding: "0px",
                    margin: "0px",
                    fontSize: ["10px", "20px"],
                    minWidth: "40px",
                    color: theme.palette.secondary.main,
                  }}
                >
                  <IconButton
                    aria-label={social?.name}
                    color="inherit"
                  >
                    {getSocialIcon(social?.name)}
                  </IconButton>
                </Button>
              )
            )}
          </Stack>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Phone />
              <Button
                sx={{
                  padding: "0px",
                  margin: "0px",
                  minWidth: "40px",
                  color: theme.palette.secondary.main,
                }}
                href={`tel:${data?.site_settings?.phone}`}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: ["10px", "20px"],
                    fontWeight: 300,
                  }}
                >
                  {data?.site_settings?.phone ?? ""}
                </Typography>
              </Button>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              my={2}
            >
              <Mail />
              <Button
                sx={{
                  padding: "0px",
                  margin: "0px",
                  minWidth: ["20px", "40px"],
                  color: theme.palette.secondary.main,
                }}
                href={`mailto:${data?.site_settings?.email}`}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: ["10px", "20px"],
                    fontWeight: 300,
                  }}
                >
                  {data?.site_settings?.email ?? ""}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTop={`1px solid ${theme.customColors.navbar}`}
          py={3}
          flexDirection={{ xs: "column", md: "row" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: ["7px", "13px"],
              fontWeight: 400,
              px: 2,
              mb: [1, 0],
            }}
          >
            Copyright &copy; {new Date().getFullYear()} Zenith Digital Space
          </Typography>
          {data?.pages?.map((page: Page, index: number) => (
            <Link
              key={index}
              href={`/${page.slug}`}
              passHref
            >
              <Typography
                variant="h3"
                sx={{
                  borderLeft: isMobile
                    ? "none"
                    : `0.1px solid ${theme.customColors.navbar}`,
                  color: theme.palette.secondary.main,
                  fontSize: ["7px", "13px"],
                  fontWeight: 400,
                  px: 2,
                  cursor: "pointer",
                  mb: [1, 0],
                }}
              >
                {page?.translations?.[0]?.title ?? ""}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
