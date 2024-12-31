import { Box, Typography } from '@mui/material'
import React from 'react'
import { createDirectus, graphql } from '@directus/sdk'
import { getLocale } from 'next-intl/server'
import { getCookie } from '@/app/utils/helper/helper'

interface Translations {
  languages_code: { code: string }
  what_we_do_fields_content_title: string
  what_we_do_fields_content_text: string
}

interface StaticContentTexts {
  translations: Translations[]
}

interface Schema {
  static_content_texts: StaticContentTexts
}

const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      static_content_texts{ 
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}){
          what_we_do_fields_content_title
          what_we_do_fields_content_text
        }
      }
    }
  `)
}

export default async function MakesDifferent() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang);
  const staticContent = data?.static_content_texts?.translations?.[0] || {}

  return (
    <Box
      display="flex"
      bgcolor="#010715"
      justifyContent="center"
      alignItems="center"
      sx={{ height: { xs: 'auto', md: '80vh' }, textAlign: 'center' }}
    >
      <Box marginBottom={4}>
        <Typography
          variant="h6"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            my: 4,
            color: '#fff',
            fontSize: ['20px', '40px'],
            fontWeight: 600,
            lineHeight: '56px',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
              fill="#DAFF23"
            />
          </svg>
          <Box sx={{ margin: { xs: '0px 5px', md: '0px 10px' } }}>
            {staticContent?.what_we_do_fields_content_title}
          </Box>
          <svg
            width="48"
            height="48"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
              fill="#DAFF23"
            />
          </svg>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            width: { xs: '95%', md: '70%' },
            mx: 'auto',
            my: 4,
            color: '#fff',
            fontSize: { xs: '18px', md: '24px' },
            fontWeight: 400,
            lineHeight: '33.6px',
          }}
        >
          {staticContent?.what_we_do_fields_content_text}
        </Typography>
      </Box>
    </Box>
  )
}
