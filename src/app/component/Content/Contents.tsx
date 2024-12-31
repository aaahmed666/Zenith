'use client'
import { Avatar, Box, Button, IconButton, Link, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { DateRangeIcon } from '@mui/x-date-pickers';
import WestIcon from '@mui/icons-material/West'
import Grid from '@mui/material/Grid2'



interface ContentsProps {
  slug: string;
}
export default function Contents({slug}: ContentsProps ) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!slug) return

    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`)
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError('Failed to fetch post details: ')
      } finally {
        setLoading(false)
      }
    }

    fetchPostDetail()
  }, [slug])
  
    if (loading) return <Typography>Loading...</Typography>
    if (error) return <Typography color="error">{error}</Typography>
    if (!post) return <Typography>No post found</Typography>
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          backgroundImage: `url(https://cms-zenith.treasuredeal.com/assets/${post.image.id})`,
          backgroundSize: 'cover',
        }}
      >
        <Box
          sx={{
            width:'100%',
            height: '100%',
            background:'rgba(0,0,0,0.6)'
          }}
        >
        <Box
          sx={{ position: 'absolute', bottom: 90, left: 90, color: 'white' }}
        >
          <Stack
            direction="row"
            sx={{ display: 'flex', alignItems: 'center', width: '75%' }}
          >
            <Link href="/blog">
              <Avatar sx={{ mr: 2 }}>
                <WestIcon />
              </Avatar>
            </Link>
            <Typography variant="h4">
              Lorem ipsum dolor sit amet consectetur diam
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Grid container spacing={3} sx={{ mx: 'auto' }}>
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                  <DateRangeIcon />
                  <Typography sx={{ ml: 1 }}>
                    {new Date(post.date_created).toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                  {/* <Box sx={{ my: 2 }} sx={{ display: 'flex' }}> */}
                  <Grid container spacing={3} sx={{ mx: 'auto' }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Button
                        sx={{
                          bgcolor: '#fff',
                          borderRadius: '25px',
                          px: 3,
                          mx: 2,
                        }}
                      >
                        Investment
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Button
                        sx={{ bgcolor: '#fff', borderRadius: '25px', px: 3 }}
                      >
                        Fundraising
                      </Button>
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                </Grid>
              </Grid>
            </Box>

            <Stack
              direction="row"
              sx={{ alignItems: 'center' }}
              role="img"
              aria-label="like"
            >
              <IconButton size="small" color="inherit">
                <ThumbUpIcon fontSize="small" />
              </IconButton>
              <Typography variant="body1" sx={{ pr: 2 }}>
                like
              </Typography>
            </Stack>
          </Box>
        </Box>
        </Box>
        

      </Box>

      <Box sx={{ width: '85%', mx: 'auto', px: 4, my: 3 }}>
        <Grid container spacing={3} sx={{ mx: 'auto' }}></Grid>
        <Typography variant="body1">
          {post?.translations?.[0]?.content}
        </Typography>
      </Box>

    </>
  )
}
