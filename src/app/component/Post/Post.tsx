"use client";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  CardContent,
  IconButton,
  Container,
  useTheme,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs, { Dayjs } from "dayjs";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import Image from "next/image";

const BASE_URL =
  (process.env.NEXT_APP_API_BASE_URL as string) ||
  (process.env.td_api as string);

export default function Posts() {
  const theme = useTheme();
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/getCategory");
      const data = await res.json();
      setCategories(data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/getPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: filterDate
            ? dayjs(filterDate.toISOString()).format("YYYY-MM-DD")
            : null,
          categoryId,
          page,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data?.posts);
        setTotalPage(data?.aggregatedCount > 0 ? data?.aggregatedCount : 1);
      } else {
        setError(data.error || "Error fetching posts");
      }
    } catch (err) {
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [filterDate, categoryId, page]);

  const handleCategoryChange = (event: any) => {
    setCategoryId(event.target.value);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setFilterDate(newValue);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        color: theme.palette.secondary.main,
        py: 12,
        backgroundColor: theme.customColors.accent,
      }}
    >
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            mb: 5,
          }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Filter by Date"
                value={filterDate}
                onChange={handleDateChange}
                sx={{
                  width: "100%",
                  ".MuiInputBase-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray",
                    },
                    "& .MuiInputBase-input": {
                      color: "gray",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "gray",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "blue",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Select
              value={categoryId || ""}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                width: "100%",
                color: categoryId ? "inherit" : "gray",
                "& .MuiSelect-icon": {
                  color: categoryId ? "gray" : "gray",
                },
                border: "1px solid",
                borderColor: categoryId ? "gray" : "gray",
                "&:hover": {
                  borderColor: "gray",
                },
                "&.Mui-focused": {
                  borderColor: "gray",
                },
              }}
            >
              <MenuItem
                value=""
                sx={{ color: "gray" }}
              >
                {"All Categories"}
              </MenuItem>
              {categories?.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.id}
                >
                  {category?.translations?.[0]?.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Container>

      <Container>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            display="flex"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              color="error"
            >
              {error}
            </Typography>
          </Box>
        ) : posts.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h4">No posts available.</Typography>
          </Box>
        ) : (
          <>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{ mx: "auto" }}
            >
              {posts?.map((post) => (
                <Grid
                  size={{ xs: 12, md: 4 }}
                  key={post.id}
                >
                  <Box
                    sx={{
                      backgroundColor: "transparent",
                      color: theme.palette.secondary.main,
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Image
                        width="360"
                        height="200"
                        src={`${BASE_URL}/assets/${post.image?.id}`}
                        alt="Article Image"
                        style={{ borderRadius: "15px" }}
                      />
                      {post?.categoryies?.map(
                        (category: any, index: number) => (
                          <Typography
                            key={index}
                            variant="h2"
                            sx={{
                              backgroundColor: "rgba(0, 0, 0, 0.55)",
                              color: theme.palette.secondary.main,
                              p: 2,
                              marginInlineStart: "10px",
                              fontWeight: 400,
                              fontSize: ["7px", "14px"],
                              position: "absolute",
                              top: "25px",
                              insetInlineEnd: "15px",
                              borderRadius: "10px",
                            }}
                          >
                            {category.data.translations?.[0]?.title ?? ""}
                          </Typography>
                        )
                      )}
                    </Box>
                    <CardContent sx={{ px: 0 }}>
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: ["12px", "24px"],
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                        }}
                      >
                        {post?.translations?.[0].title ?? ""}
                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: ["8px", "16px"],
                          color: theme.customColors.navbar,
                          fontWeight: 500,
                          mb: 3,
                        }}
                      >
                        {post?.date_created
                          ? new Date(post?.date_created).toLocaleDateString()
                          : ""}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            fontSize: ["10px", "20px"],
                            color: theme.customColors.navbar,
                            fontWeight: 400,
                          }}
                        >
                          {post?.translations?.[0]?.excerpt ?? ""}
                        </Typography>

                        <Link
                          href={`/blog/${post?.slug}`}
                          passHref
                        >
                          <IconButton
                            sx={{
                              color: theme.palette.secondary.main,
                              backgroundColor: theme.palette.primary.main,
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                              ml: 1,
                              "&:hover": {
                                backgroundColor: theme.customColors.navbar,
                              },
                            }}
                          >
                            <ArrowForwardIcon />
                          </IconButton>
                        </Link>
                      </Box>
                    </CardContent>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Pagination
              className="pagination-monitor-list"
              count={totalPage}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
            />
          </>
        )}
      </Container>
    </Box>
  );
}
