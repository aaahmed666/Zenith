"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
interface VisionCardProps {
  title: string;
  description: string;
}
function VisionCard({ title, description }: VisionCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        backgroundColor: theme.customColors.card,
        borderRadius: "0px",
      }}
    >
      <Box sx={{ padding: { md: "15px 0 0 15px" } }}>
        <svg
          width={isMobile ? "90" : "123"}
          height={isMobile ? "90" : "123"}
          viewBox="0 0 123 123"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M61.5 0L61.8205 11.6067C62.5677 38.6694 84.3306 60.4323 111.393 61.1795L123 61.5L111.393 61.8205C84.3306 62.5677 62.5677 84.3306 61.8205 111.393L61.5 123L61.1795 111.393C60.4323 84.3306 38.6694 62.5677 11.6066 61.8205L0 61.5L11.6067 61.1795C38.6694 60.4323 60.4323 38.6694 61.1795 11.6066L61.5 0Z"
            fill="#8411E6"
          />
        </svg>
      </Box>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: theme.customColors.text,
            fontWeight: 600,
            fontSize: ["10px", "20px"],
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h2"
          my={1}
          sx={{
            color: theme.customColors.text,
            fontWeight: 400,
            fontSize: ["7px", "15px"],
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default VisionCard;
