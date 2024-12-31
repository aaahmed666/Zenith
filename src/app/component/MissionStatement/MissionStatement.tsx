import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import MissionCard from '../../MissionCardProps/MissionCardProps'

import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '@/app/utils/helper/helper'
import { getLocale } from 'next-intl/server'

interface Translations {
  languages_code: { code: string }
  title: string
  text: string
  our_mission_title: string
}

interface Mission {
  translations: Translations[]
}
interface StaticContentTexts {
  translations: Translations[]
}

interface Schema {
  mission: Mission[]
  static_content_texts: StaticContentTexts
}
const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      mission {
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          title
          text
        }
      }
      static_content_texts {
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          our_mission_title
        }
      }
    }
  `)
}

export default async function MissionStatement() {
  // console.log("ahmed", JSON.stringify(await HomeData(), null,2) );
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang)
  const staticContent = data?.static_content_texts?.translations?.[0] || {}
  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#010715',
        textAlign: 'center',
        maxHeight: { md: '75vh' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xl" sx={{ width: '95%', mx: 'auto', px: { xs: 0 } }}>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              fontSize: { xs: '25px' },
              fontWeight: 'bold',
              mx: 'auto',
              color: '#fff',
            }}
          >
            {staticContent.our_mission_title}
            {/* OUR MISSION STATEMENT */}
          </Typography>
          <Grid
            container
            justifyContent="center"
            sx={{ display: 'flex', mt: 4, width: '85%', mx: 'auto' }}
            spacing={1}
          >
            {data.mission.map((item, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{ px: { md: 0 } }}
                key={index}
              >
                <MissionCard
                  title={item.translations[0]?.title}
                  description={item.translations[0]?.text}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
