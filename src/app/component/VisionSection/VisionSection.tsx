import React from 'react'
import { Box, Typography, Link, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import VisionCard from '../VisionCard/VisionCard'

import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '@/app/utils/helper/helper'
import { getLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

interface Translations {
  languages_code: { code: string }
  title: string
  text: string
  our_vision_title: string
}

interface Vision {
  translations: Translations[]
}

interface StaticContentTexts {
  translations: Translations[]
}

interface Schema {
  vision: Vision[]
  static_content_texts: StaticContentTexts
}
const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      vision {
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          title
          text
        }
      }
      static_content_texts{ 
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
        our_vision_title
        }
      }
    }
  `)
}

interface VisionSectionProps {
  btn?: boolean;
}

export default async function VisionSection({ btn = false }: VisionSectionProps) {
  
  
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang)
  const staticContent = data?.static_content_texts?.translations?.[0] || {}
  // const {t} = useTranslations();

  return (
    <>
      <Container
        sx={{
          py: { xs: 4, md: 5 },
        }}
      >
        <Box
          mb={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg
            width="45"
            height="45"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
              fill="#8411E6"
            />
          </svg>
          <Typography
            sx={{ margin: '0px 10px' }}
            variant="h4"
            fontWeight="bold"
            textAlign="center"
          >
            {staticContent.our_vision_title}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {data?.vision.map((item, i) => (
            <Grid
              size={{ xs: 12, md: 4 }}
              key={i}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <VisionCard
                title={item.translations[0]?.title}
                description={item.translations[0]?.text}
                // description={item.translations[0]?.title}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{width: '100%', mx:'auto', textAlign:'center' }}>
          {btn && (
            <Link
              href="/about"
              underline="none"
              sx={{
                backgroundColor: 'rgba(132, 17, 230, 1)',
                color: '#fff',
                padding: '15px 25px',
                fontWeight: 600,
                lineHeight: '22.4px',
                borderRadius: '0px',
                px: 5,
                my: 5,
                mx: "auto",
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              About Zenith
            </Link>
          )}
        </Box>
      </Container>
    </>
  )
}
