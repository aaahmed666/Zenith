"use client";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Typography, useTheme } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

interface CommentProps {
  name: string;
  date: string;
  text: string;
  likes: number;
  replies: number;
  nested?: boolean;
}

const Comment: React.FC<CommentProps> = ({
  name,
  date,
  text,
  likes,
  replies,
  nested = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.customColors.replay,
        color: theme.customColors.text,
        borderInlineStart: nested ? `1px solid ${theme.customColors.third}` : 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginInlineStart: "5px",
        }}
      >
        <AccountCircleOutlinedIcon />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: ["7px", "15px"],
            mx: 1,
            color: theme.customColors.text,
            lineHeight: "27px",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: ["6px", "14px"],
            color: theme.customColors.text,
            fontWeight: 300,
            mx: 1,
            lineHeight: "27px",
          }}
        >
          {date}
        </Typography>
        <ThumbUpIcon
          sx={{ color: theme.customColors.third }}
          fontSize="small"
        />
        <Typography
          variant="h3"
          sx={{
            fontSize: ["7px", "15px"],
            margin: "0 5px",
            color: theme.customColors.third,
            fontWeight: 300,
          }}
        >
          {likes}
        </Typography>
        <ChatIcon
          sx={{ color: theme.customColors.third }}
          fontSize="small"
        />
        <Typography
          variant="h3"
          sx={{
            fontSize: ["7px", "15px"],
            margin: "0 5px",
            color: theme.customColors.third,
            fontWeight: 300,
          }}
        >
          {replies}
        </Typography>
      </Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: ["6px", "15px"],
          fontWeight: 400,
          color: theme.customColors.text,
          p: 1,
          mb: 2,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Comment;
