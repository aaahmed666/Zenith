import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function RelatedTopics() {
  return (
    <Container>
      <Typography variant="h6">Related Topics</Typography>
      <Grid container spacing={3} sx={{ mx: 'auto', }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid size={{ xs: 12, md:4 }} key={item}>
            <Card sx={{ bgcolor: 'transparent' }}>
              <Typography variant="h6" sx={{ color: '#fff', my: 2 }}>
                Lorem ipsum dolor sit amet consectetur diam
              </Typography>
              <Box>
                <CardMedia
                  component="img"
                  height="140"
                  image="/image2.png"
                  alt="Article Image"
                  sx={{ borderRadius: '12px', my: 1 }}
                />
              </Box>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="body2" sx={{ color: '#fff', my: 2 }}>
                  Lorem ipsum dolor sit amet consectetu Diam bibendum ut
                  diam tempus sociis lectus luctus in? Lorem ipsum dolor sit
                  amet consectetur Diam bibendum ut diam tempus sociis
                  lectus luctus in?
                </Typography>
                <Button
                  variant="text"
                  sx={{ background: '#0000FE', color: '#fff' }}
                  startIcon={<ArrowForwardIcon />}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
