"use client";
import {
  Avatar,
  Box,
  Container,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { DateRangeIcon } from "@mui/x-date-pickers";
import WestIcon from "@mui/icons-material/West";
import Grid from "@mui/material/Grid2";
import Comment from "@/app/Comment/Comment";
import ReactMarkdown from "react-markdown";
import LeaveReply from "../LeaveReply/LeaveReply";
import RelatedTopics from "../RelatedTopics/RelatedTopics";
import Loader from "../Loader/Loader";
import { useTranslations } from "next-intl";

interface ContentsProps {
  slug: string;
}

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

export default function Contents({ slug }: ContentsProps) {
  const theme = useTheme();
  const t = useTranslations();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullContent, setShowFullContent] = useState<boolean>(true);

  const handleToggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  useEffect(() => {
    if (!slug) return;

    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError("Failed to fetch post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [slug]);

  if (loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
      />
    );
  }

  if (!post)
    return (
      <Typography
        variant="h3"
        sx={{ fontSize: "14px", fontWeight: 400 }}
      >
        No post found
      </Typography>
    );

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${BASE_URL}/assets/${post.image.id})`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <Container>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 120,
                  color: theme.palette.secondary.main,
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}>
                  <Link href="/blog">
                    <Avatar
                      sx={{
                        marginInlineEnd: "10px",
                        marginTop: "13px",
                        backgroundColor: theme.palette.secondary.main,
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      <WestIcon sx={{ color: theme.palette.primary.main }} />
                    </Avatar>
                  </Link>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: ["20px", "40px"],
                      lineHeight: "60px",
                      fontWeight: 600,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {post?.translations?.[0]?.title ?? ""}
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                  sx={{ alignItems: "center" }}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <DateRangeIcon
                          sx={{ color: theme.customColors.content }}
                        />
                        <Typography
                          variant="h4"
                          sx={{
                            marginInlineStart: "5px",
                            color: theme.customColors.content,
                            fontSize: ["8px", "16px"],
                            fontWeight: 500,
                          }}
                        >
                          {post?.date_created
                            ? new Date(post.date_created).toLocaleDateString()
                            : ""}
                        </Typography>
                      </Box>
                      {post?.categoryies?.map(
                        (category: any, index: number) => (
                          <Typography
                            key={index}
                            variant="h2"
                            sx={{
                              bgcolor: theme.customColors.comment,
                              borderRadius: "25px",
                              p: 2,
                              mx: 2,
                              color: theme.customColors.primary,
                              cursor: "pointer",
                              fontSize: ["7", "14px"],
                              fontWeight: 300,
                            }}
                          >
                            {category.data.translations?.[0]?.title ?? ""}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <ThumbUpIcon fontSize="small" />
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: ["10px", "20px"],
                          fontWeight: 500,
                          color: theme.palette.secondary.main,
                          marginInlineStart: "7px",
                        }}
                      >
                        {t("Like")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            my: 3,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: ["12px", "24px"],
              fontWeight: 400,
              color: theme.palette.secondary.main,
            }}
          >
            {showFullContent ? (
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      style={{
                        fontSize: isMobile ? "20px" : "40px",
                        marginBottom: "16px",
                        fontWeight: 800,
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      style={{
                        fontWeight: 800,
                        fontSize: isMobile ? "17px" : "35px",
                        marginBottom: "16px",
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      style={{
                        fontWeight: 800,
                        fontSize: isMobile ? "15px" : "30px",
                        marginBottom: "16px",
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      style={{
                        fontSize: isMobile ? "9px" : "18px",
                        lineHeight: 1.8,
                        marginBottom: "16px",
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      style={{
                        textDecoration: "underline",
                        fontWeight: 600,
                        fontFamily: "Poppins",
                        color: theme.customColors.primary,
                        fontSize: isMobile ? "8px" : "16px",
                      }}
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      style={{
                        paddingInlineEnd: "1.5em",
                        marginBottom: "16px",
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li
                      style={{
                        fontSize: isMobile ? "9px" : "18px",
                        marginBottom: "8px",
                        fontFamily: "Poppins",
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {post?.translations?.[0]?.content ?? ""}
              </ReactMarkdown>
            ) : (
              (post?.translations?.[0]?.excerpt ?? "")
            )}
            <Typography
              variant="h1"
              style={{
                color: theme.customColors.primary,
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "24px",
                fontWeight: 400,
              }}
              onClick={handleToggleContent}
            >
              {showFullContent ? t("Show_less") : t("Read_More")}
            </Typography>
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mb: 2,
            }}
          >
            {post?.comments?.length > 0 ? (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: ["10px", "20px"],
                    color: theme.palette.secondary.main,
                    fontWeight: 400,
                    marginInlineEnd: "5px",
                  }}
                >
                  {t("Comments")}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: ["10px", "20px"],
                    color: theme.palette.secondary.main,
                    fontWeight: 400,
                  }}
                >
                  ({post?.comments?.length})
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  color: theme.customColors.navbar,
                  my: 2,
                  fontSize: ["10px", "20px"],
                  fontWeight: 400,
                  lineHeight: "27px",
                }}
                variant="h3"
              >
                No Comments found.
              </Typography>
            )}
          </Box>

          {post?.comments?.map((item: any, index: number) => (
            <Box
              key={index}
              sx={{ backgroundColor: theme.customColors.replay, py: 1, mb: 2 }}
            >
              <Comment
                name={item.name}
                date={new Date(item.date_created).toLocaleDateString()}
                text={item.comment}
                likes={23}
                replies={10}
              />
              <Box sx={{ marginInlineStart: 3 }}>
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
        <LeaveReply postId={post?.id} />
        <RelatedTopics postId={post?.id} />
      </Container>
    </>
  );
}
