import React from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  CardMedia,
  Button,
  Card,
  CardContent,
  Stack,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DateRangeIcon from "@mui/icons-material/DateRange";
import WestIcon from "@mui/icons-material/West";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/system";

const ArticlePage = () => {
  const theme = useTheme();
  const t = useTranslations();
  const WhiteBorderTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      color: theme.palette.secondary.main,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.secondary.main,
    },
  });
  return (
    <>
      <Box sx={{ bgcolor: "#010715", color: "white" }}>
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            backgroundImage: "url(/image12.png)",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{ position: "absolute", bottom: 90, left: 90, color: "white" }}
          >
            <Stack
              direction="row"
              sx={{ display: "flex", alignItems: "center", width: "75%" }}
            >
              <Avatar sx={{ mr: 2 }}>
                <WestIcon />
              </Avatar>
              <Typography variant="h4">
                Lorem ipsum dolor sit amet consectetur diam
              </Typography>
            </Stack>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <DateRangeIcon />
                <Typography sx={{ ml: 1 }}>21-08-2024</Typography>

                <Box sx={{ my: 2 }}>
                  <Button
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: "25px",
                      px: 3,
                      mx: 2,
                    }}
                  >
                    Investment
                  </Button>

                  <Button
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: "25px",
                      px: 3,
                    }}
                  >
                    Fundraising
                  </Button>
                </Box>
              </Box>

              <Stack
                direction="row"
                sx={{ alignItems: "center" }}
                role="img"
                aria-label="like"
              >
                <IconButton
                  size="small"
                  color="inherit"
                >
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="h1"
                  sx={{ pr: 2 }}
                >
                  like
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: 5, my: 3 }}>
          <Typography variant="h1">
            Lorem ipsum dolor sit amet consectetu Diam bibendum ut diam tempus
            sociis lectus luctus in? Lorem ipsum dolor sit amet consectetur Diam
            bibendum ut diam tempus sociis lectus luctus in?Lorem ipsum dolor
            sit amet consectetu Diam bibendum ut diam tempus sociis lectus
            luctus in? Lorem ipsum dolor sit amet consectetur Diam bibendum ut
            diam tempus sociis lectus luctus in?Lorem ipsum dolor sit amet
            consectetu Diam bibendum ut diam tempus sociis lectus luctus in? rem
            ipsum dolor sit amet consectetur Diam bibendum ut diam tempus sociis
            lectus luctus in?Lorem ipsum dolor sit amet consectetu Diam bibendum
            ut diam tempus sociis lectus luctus in? Lorem ipsum dolor sit amet
            consectetur Dibibendum ut diam tempus sociis lectus luctus in?Lorem
            ipsum dolor sit amet consectetu Diam bibendum ut diam tempus sociis
            lectus luctus in? Lorem ipsum dolor sit amet consectetur Diam
            bibendum ut diam tempus sociis lectus luctus in?Lorem ipsum dolor
            sit amet coctetu Diam bibendum ut diam tempus sociis lectus luctus
            in? Lorem ipsum dolor sit amet consectetur Diam bibendum ut diam
            tempus sociis lectus luctus in?Lorem ipsum dolor sit amet consectetu
            Diam bibendum ut diam tempus sociis lectus luctus in? Lorem ipsum
            dolor sit amet consectetur Diam bibendum ut diam tempus sociis
            lectus luctus in?Lorem ipsum dolor sit amet consectetu Diam bibendum
            ut diam tempus sociis lectus luctus in? Lorem ipsum dolor sit amet
            consectetur Diam bibendum ut diam tempus sociis lectus luctus
            in?Lorem ipsum dolor sit amet consectetu Diam bibendum ut diam
            tempus sociis lectus luctus in? Lorem ipsum dolor sit amet
            consectetur Diam bibendum ut diam tempus sociis lectus luctus in?
          </Typography>
        </Box>

        <Box sx={{ padding: 4 }}>
          <Typography variant="h6">
            Comments : <span>(4)</span>
          </Typography>
          {[1, 2, 3, 4].map((item, index) => (
            <Box
              key={index}
              sx={{ width: "90%", ml: 2, my: 2, py: 2, bgcolor: "#f5f5f5" }}
            >
              <Comment
                name="Mohammad"
                date="21-08-2024"
                text="Lorem ipsum dolor sit amet consectetu Diam bibendum ut diam tempus sociis lectus luctus in? Lorem ipsum dolor sit amet consectetur Diam bibendum ut diam tempus sociis lectus luctus in?Lorem ipsum dolor sit amet consectetu Diam bibendum ut diam "
                likes={23}
                replies={10}
              />
              <Box sx={{ borderLeft: "2px solid #d1d1d1", ml: 3 }}>
                <Comment
                  name="Ghassan"
                  date="21-08-2024"
                  text="Lorem ipsum dolor sit amet consectetu Diam bibendum ut diam tempus sociis lectus luctus in? Lorem ipsum dolor sit amet consectetur Diam bibendum ut diam tempus sociis lectus luctus in?Lorem ipsum dolor sit amet consectetu Diam bibendum ut diam "
                  likes={9}
                  replies={5}
                  nested
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ width: "85%", m: "auto", px: 0 }}>
          <Typography variant="h6">Related Topics</Typography>
          <Grid
            container
            spacing={2}
            sx={{ px: 0, mx: "auto", width: "100%" }}
          >
            {[1, 2, 3, 4].map((item) => (
              <Grid
                size={{ xs: 2 }}
                key={item}
              >
                <Card sx={{ bgcolor: "transparent", width: "350px" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.secondary.main, my: 2 }}
                  >
                    Lorem ipsum dolor sit amet consectetur diam
                  </Typography>
                  <Box>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/image2.png"
                      alt="Article Image"
                      sx={{ borderRadius: "12px", my: 1 }}
                    />
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      variant="h2"
                      sx={{ color: theme.palette.secondary.main, my: 2 }}
                    >
                      Lorem ipsum dolor sit amet consectetu Diam bibendum ut
                      diam tempus sociis lectus luctus in? Lorem ipsum dolor sit
                      amet consectetur Diam bibendum ut diam tempus sociis
                      lectus luctus in?
                    </Typography>
                    <Button
                      variant="text"
                      sx={{
                        background: "#0000FE",
                        color: theme.palette.secondary.main,
                      }}
                      startIcon={<ArrowForwardIcon />}
                    >
                      {t("Read_More")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ArticlePage;

import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslations } from "next-intl";

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
}) => (
  <Box
    sx={{
      backgroundColor: "#f5f5f5",
      color: "black",
      px: 2,
      my: nested ? 2 : 0,
    }}
  >
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center" }}
    >
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
      <Stack
        direction="row"
        sx={{ alignItems: "center" }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: 1 }}
        >
          {date}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center" }}
      >
        <IconButton
          size="small"
          color="inherit"
        >
          <ThumbUpIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption">{likes}</Typography>
        <IconButton
          size="small"
          color="inherit"
        >
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption">{replies}</Typography>
      </Stack>
    </Stack>
    <Typography
      variant="h2"
      sx={{ my: 1 }}
    >
      {text}
    </Typography>
  </Box>
);
