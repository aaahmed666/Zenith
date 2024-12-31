// components/MissionCard.tsx

import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'

interface MissionCardProps {
  title: string
  description: string
}

const MissionCard: React.FC<MissionCardProps> = ({ title, description }) => {
  return (
    <Card
      sx={{
        minHeight: { md: 180 },
        backgroundColor: 'transparent',
        color: 'primary.contrastText',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
              fill="#587603"
            />
          </svg>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ margin: { xs: '0px 0px', md: '0px 2px' } }}
          >
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" my={1} color="gray">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MissionCard
