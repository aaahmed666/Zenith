"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader/Loader";
import { useTranslations } from "next-intl";

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

interface RelatedTopicsProps {
  postId: string;
}

export default function RelatedTopics({ postId }: RelatedTopicsProps) {
  const t = useTranslations();
  const theme = useTheme();
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`/api/relatedTopics?postId=${postId}`);
        const data = await response.json();
        if (data?.data?.posts_by_id && data?.data?.posts_by_id?.related_posts) {
          const related = data?.data?.posts_by_id?.related_posts?.map(
            (post: any) => post?.related_posts_id
          );
          setRelatedPosts(related);
        } else {
          setRelatedPosts([]);
        }
      } catch (err) {
        setError("Failed to fetch post details: ");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <Container>
      {relatedPosts?.length > 0 ? (
        <>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "32px",
              fontWeight: 500,
              lineHeight: "48px",
              my: 6,
              textDecoration: "underline",
            }}
          >
            Related Topics
          </Typography>
          <Grid
            container
            spacing={3}
          >
            {relatedPosts?.map((post, index) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={index}
              >
                <Card sx={{ bgcolor: "transparent" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: "35px",
                      my: 2,
                    }}
                  >
                    {post?.translations?.[0]?.title ?? ""}
                  </Typography>
                  <Box>
                    <Image
                      width="350"
                      height="240"
                      src={`${BASE_URL}/assets/${post?.image?.id}`}
                      alt={post?.translations?.[0]?.title || "Article Image"}
                      style={{ borderRadius: "12px" }}
                    />
                  </Box>
                  <Typography
                    variant="h2"
                    sx={{
                      color: theme.customColors.navbar,
                      my: 2,
                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: "27px",
                    }}
                  >
                    {post?.translations?.[0]?.excerpt ?? ""}
                  </Typography>
                  <Link
                    href={`/blog/${post?.slug}`}
                    passHref
                  >
                    <Button
                      variant="text"
                      sx={{
                        background: theme.customColors.primary,
                        fontSize: "15px",
                        fontWeight: 600,
                        p: 1,
                        color: theme.palette.secondary.main,
                      }}
                      startIcon={<ArrowForwardIcon fontSize="large" />}
                    >
                      {t("Read_More")}
                    </Button>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography
          sx={{
            color: theme.customColors.navbar,
            my: 2,
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "27px",
          }}
          variant="h3"
        >
          No related topics found.
        </Typography>
      )}
    </Container>
  );
}
