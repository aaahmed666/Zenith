import { Box, Container, Link, Typography } from '@mui/material'
import React from 'react'
import { createDirectus, graphql } from '@directus/sdk'
import { getLocale } from 'next-intl/server'
import { getCookie } from '@/app/utils/helper/helper'

interface Translations {
  languages_code: { code: string }
  contact_us_title: string
  contact_us_text: string
  contact_us_form_note: string
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
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          contact_us_title
          contact_us_text
          contact_us_form_note
        }
      }
    }
  `)
}

export default async function ContactFormText() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang)
  const staticContent = data?.static_content_texts?.translations?.[0] || {};

  console.log('ahmed data?.static_content_texts', data?.static_content_texts)
  

  return (
    <>
      <Container
        sx={{textAlign: 'center'}}
      >
        <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '32px' } }}>
          {staticContent?.contact_us_title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: { xs: '95%', md: '88%' },
            mx: 'auto',
            px: { md: 4 },
          }}
        >
          {staticContent?.contact_us_text}
        </Typography>
        <Typography sx={{ mb: 4 }}>
          <Link sx={{ textDecoration: 'none' }}>
            {staticContent?.contact_us_form_note}
          </Link>
        </Typography>
      </Container>
    </>
  )
}
