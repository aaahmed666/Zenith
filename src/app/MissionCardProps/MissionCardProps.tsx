import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

interface MissionCardProps {
  title: string;
  description: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ title, description }) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
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
          variant="h1"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 600,
            fontSize: ["10px", "20px"],
            position: "absolute",
            insetInlineStart: "15px",
            top: ["13px", "8px"],
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        mt={[0, 2]}
        variant="h2"
        sx={{
          fontSize: ["7px", "15px"],
          color: theme.customColors.navbar,
          fontWeight: 300,
          textAlign: ["start", "center"],
          lineHeight: "30px",
          marginInlineStart: ["15px", "0px"],
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default MissionCard;
