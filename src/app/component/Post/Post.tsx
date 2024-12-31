'use client'

import { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  Box,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  CardMedia,
  CardContent,
  IconButton,
  Container,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import dayjs, { Dayjs } from 'dayjs'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

export default function Posts() {
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/getCategory')
      const data = await res.json()
      setCategories(data.categories)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/getPosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: filterDate
            ? dayjs(filterDate.toISOString()).format('YYYY-MM-DD')
            : null,
          categoryId,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setPosts(data.posts)
      } else {
        setError(data.error || 'Error fetching posts')
      }
    } catch (err) {
      setError('Error fetching posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [filterDate, categoryId])

  const handleCategoryChange = (event: any) => {
    setCategoryId(event.target.value)
  }

  const handleDateChange = (newValue: Dayjs | null) => {
    setFilterDate(newValue)
  }

  function truncateText(text: string, wordLimit: number): string {
    const words = text.split(' ')
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + ' . . . '
      : text
  }

  return (
    <Box
      sx={{
        color: '#fff',
        py: 9,
        backgroundColor: '#010715',
      }}
    >
      {/* Filter Section */}
      <Container
        sx={{
      
          gap: { xs: 1, md: 2 },
          mb: 4,
        }}
      >
        <Grid container spacing={2} sx={{ width: '100%', mx: 'auto' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Filter by Date"
                value={filterDate}
                onChange={handleDateChange}
                sx={{
                  width: '100%',
                  '.MuiInputBase-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'gray',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'gray',
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'gray',
                  },
                  '& .Mui-focused .MuiInputLabel-root': {
                    color: 'gray',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'gray',
                  },
                  '&:hover .MuiSvgIcon-root': {
                    color: 'blue',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Select
              value={categoryId || ''}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                width: '100%',
                color: categoryId ? 'inherit' : 'gray',
                '& .MuiSelect-icon': {
                  color: categoryId ? 'gray' : 'gray', // Conditional icon color
                },
                border: '1px solid', // Define border style
                borderColor: categoryId ? 'gray' : 'gray', // Conditional border color
                '&:hover': {
                  borderColor: 'gray', // Border color on hover
                },
                '&.Mui-focused': {
                  borderColor: 'gray', // Border color when focused
                },
              }}
            >
              <MenuItem value="" sx={{ color: 'gray' }}>
                {'All Categories'}
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.translations[0]?.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Container>

      {/* Posts Section */}
      <Container>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : posts.length === 0 ? (
          <Box display="flex" justifyContent="center">
            <Typography>No posts available.</Typography>
          </Box>
        ) : (
          <Grid container spacing={0} justifyContent="center" sx={{ mx: 'auto' }}>
            {posts.map((post) => (
              <Grid size={{ xs: 12, md: 4 }} key={post.id}>
                <Box
                  style={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: '350px',
                    margin: '0 auto',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://cms-zenith.treasuredeal.com/assets/${post.image?.id}`}
                    alt="Article Image"
                  />
                  <CardContent sx={{ px: 0 }}>
                    <Typography variant="h6">
                      {post?.translations?.[0].title}
                    </Typography>
                    <Typography variant="caption" color="white">
                      {new Date(post.date_created).toLocaleDateString()}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 2,
                      }}
                    >
                      <Typography variant="body2">
                        {truncateText(
                          post?.translations?.[0]?.excerpt ||
                            'No excerpt available for this post.',
                          100
                        )}
                      </Typography>

                      <Link href={`/blog/${post.slug}`} passHref>
                        <IconButton
                          sx={{
                            color: '#fff',
                            backgroundColor: '#8411E6',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            ml: 1,
                            '&:hover': {
                              backgroundColor: '#0000C7',
                            },
                          }}
                        >
                          <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                      </Link>
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear();
  return `${day}-${month}-${year}`
}
