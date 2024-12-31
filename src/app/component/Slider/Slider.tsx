'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

type Service = {
  icon: string
  title: string
  description: string
}

// Define the props for the Sliders component using `type`
type SlidersProps = {
  services: Service[]
}

const Sliders: React.FC<SlidersProps> = ({ services }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default to 3 slides on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablets and up (default: 3 slides)
        settings: {
          slidesToShow: 2, // 2 slides on tablets
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
  }

  return (
    // <Box
    // >
    <Container
      sx={{
        overflow: 'hidden',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
      >
        <Slider {...settings}>
          {services?.map((service, i) => (
            <Grid size={{ xs: 12, md: 11 }} key={i}>
              <Card
                sx={{
                  bgcolor: 'transparent',
                  border: '1px solid',
                  borderImageSource:
                    'linear-gradient(180deg, #8411E6 0%, #0000FE 100%)',
                  borderImageSlice: 1,
                  color: '#fff',
                  py: { xs: 0, md: 3 },
                  mx: { xs: 2 },
                  boxSizing: 'border-box',
                  minHeight: { md: '320px' },
                }}
              >
                <Box>
                  <img
                    style={{
                      width: '20%',
                      margin: '8px auto',
                    }}
                    src={service?.icon}
                    alt=""
                  />
                </Box>
                <CardContent sx={{ px: 0 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {service?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ px: 2, fontWeight: 600 }}
                    color="gray"
                    gutterBottom
                  >
                    {service?.description}
                  </Typography>
                  <Button
                    sx={{
                      bgcolor: '#0000EF',
                      color: '#fff',
                      px: 3,
                      pt: 1,
                      mt: 3,
                      textTransform: 'none',
                    }}
                  >
                    Explore More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Slider>

      </Container>

    // </Box>
  )
}

export default Sliders
