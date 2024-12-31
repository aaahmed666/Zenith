"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Service = {
  icon: string;
  title: string;
  description: string;
};

type SlidersProps = {
  services?: Service[];
};

const Sliders: React.FC<SlidersProps> = ({ services }: SlidersProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };
  const theme = useTheme();
  const t = useTranslations();

  return (
    <Container
      sx={{
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {services?.map((service, i) => (
          <Grid
            container
            spacing={8}
          >
            <Grid
              item
              xs={12}
              key={i}
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
                      my: 2,
                      color: theme.palette.secondary.main,
                      fontSize: ["10px", "18px"],
                    }}
                  >
                    {service?.title ?? ""}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      px: 2,
                      fontWeight: 300,
                      fontSize: ["7px", "15px"],
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {service?.description ?? ""}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    bgcolor: theme.customColors.primary,
                    color: theme.palette.secondary.main,
                    textTransform: "none",
                    mt: 2,
                    p: 1,
                    fontWeight: 600,
                    fontSize: ["8px", "16px"],
                  }}
                >
                  {t("Explore_More")}
                </Button>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Slider>
    </Container>
  );
};

export default Sliders;
