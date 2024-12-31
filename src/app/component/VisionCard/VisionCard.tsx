import { Box, Card, CardContent, Typography } from '@mui/material'
interface VisionCardProps {
  title: string
  description: string
}
function VisionCard({ title, description }: VisionCardProps) {
  return (
    <Card
      sx={{
        minHeight: { md: 250 },
        minWidth: { md: 350 },
        maxWidth: { md: 320 },
        backgroundColor: '#EEDBFF',
        borderRadius: '0px',
      }}
    >
      <Box sx={{ padding: { md: '15px 0 0 15px' } }}>
        <svg
          width="55"
          height="55"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
            fill="#8411E6"
          />
        </svg>
      </Box>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#000' }}>
          {title}
        </Typography>
        <Typography variant="body2" my={1} sx={{ color: '#000' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default VisionCard
