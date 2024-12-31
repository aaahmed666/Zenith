import { Box, CardMedia, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import React from 'react'
import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '@/app/utils/helper/helper'
import { getLocale } from 'next-intl/server'

interface Translations {
  languages_code: { code: string }
  name: string
  position: string
}

interface Team {
  translations: Translations[]
  image: { id: string }
}

interface Schema {
  team: Team[]
}
const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())
async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      team{
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          name
          position
        }
        image{
          storage
          filesize
          embed
          id
        }
      }
    }
  `)
}
export default async function Leadership() {
  // console.log("ahmed", JSON.stringify(await HomeData(), null,2) );
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang)
  return (
    <Box display="flex" sx={{ p: { xs: 2,  } }}>
      {/* <Box sx={{ width: '85%', mx: { xs: 'auto', md: 'auto' } }}> */}
        <Container>
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                fill="#8411E6"
              />
            </svg>
            <span style={{ marginLeft: '15px' }}>LEADERSHIP TEAM</span>
          </Typography>

          <Grid
            container
            spacing={5}
            sx={{ mt: 2, justifyContent: 'center', mx: 'auto' }}
          >
            {data.team.map((member, index) => {
              const wrapColors = ['#DAFF23', '#8411E6', '#0000FE']
              const bgColor = wrapColors[index % wrapColors.length]
              return (
                <Grid
                  size={{ xs: 12, md: 4 }}
                  sx={{ mx: 'auto', justifyContent: 'center' }}
                  key={index}
                >
                  <Box sx={{ color: 'red' }}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        image={`${BASE_URL}/assets/${member.image.id}`}
                        alt={member.translations[0].name}
                        // height="320"
                        // sx={{ width: '250px' }}
                      />
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                   
                          bgcolor: bgColor,
                          position: 'absolute',
                          left: '-15px',
                          bottom: '-15px',
                          zIndex: '-1',
                        }}
                      ></Box>
                    </Box>

                    <Box sx={{ mt: 5 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: '#000' }}
                      >
                        {member.translations[0].name}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        {member.translations[0].position}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Container>

        {/* <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
          {[
            {
              name: 'NOURA ALI',
              title: 'CEO',
              image: '/image10.png',
              color: '#DAFF23',
            },
            {
              name: 'NOURA ALI',
              title: 'CEO',
              image: '/image11.png',
              color: '#8411E6',
            },
            {
              name: 'RAMI HASSAN',
              title: 'Managing Partner',
              image: '/image12.png',
              color: '#0000FE',
            },

            {
              name: 'RAMI HASSAN',
              title: 'Managing Partner',
              image: '/image12.png',
              color: '#0000FE',
            },
            {
              name: 'NOURA ALI',
              title: 'CEO',
              image: '/image11.png',
              color: '#8411E6',
            },
            {
              name: 'NOURA ALI',
              title: 'CEO',
              image: '/image10.png',
              color: '#DAFF23',
            },
          ].map((member, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box sx={{ color: 'red' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={member.image}
                    alt={member.name}
                    // height="350"
                    sx={{ width: '250px' }}
                  />
                  <Box
                    sx={{
                      width: '250px',
                      height: '250px',
                      bgcolor: member.color,
                      position: 'absolute',
                      left: '-15px',
                      bottom: '-15px',
                      zIndex: '-1',
                    }}
                  ></Box>
                </Box>

                <Box sx={{ mt: 5 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#000' }}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {member.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid> */}
      {/* </Box> */}
    </Box>
  )
}
