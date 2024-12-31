import React from 'react'
import styles from '../../component/Header/Header.module.css'
import { Box, Link } from '@mui/material';

import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '@/app/utils/helper/helper';
import { getLocale } from 'next-intl/server';

interface Translations {
  languages_code: { code: string }
  posts_page_title: string
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
          posts_page_title
        }
      }
    }
  `)
}

export default async function HeadBlog() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang)  
  const staticContent = data?.static_content_texts?.translations?.[0] || {}

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        height: { xs: '30vh', md: '100vh' },
        alignItems: { xs: 'end', md: 'center' },
        textAlign: 'center',
      }}
      className={styles.headerPage}
    >
      <Box>
        <Link
          href="/about"
          sx={{
            color: '#fff',
            fontSize: { xs: '35px', md: '50px' },
            fontWeight: 600,
            lineHeight: '56px',
            position: 'relative',
            textDecoration: 'none',
            textTransform: 'uppercase',
            background:
              'linear-gradient(to right, #FDFDFD, #FDFDFD, #0000FE, #0000FE )',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: '-5px',
              width: '100%',
              height: '2px',
              backgroundColor: '#DAFF23',
              transform: 'scaleX(0)',
              transformOrigin: 'bottom right',
              transition: 'transform 0.3s ease',
            },
            '&:hover::after': {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
          }}
        >
          {staticContent.posts_page_title}
        </Link>
      </Box>
    </Box>
  )
}
