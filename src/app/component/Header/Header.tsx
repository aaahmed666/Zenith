import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styles from '../Header/Header.module.css'

import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '@/app/utils/helper/helper'
import { getLocale } from 'next-intl/server'

interface Hero {
  languages_code: { code: string }
  headline: string
  text: string
  sub_headline: string
  button_text: string
}

interface Service {
  icon: string
  user_updated: string
}

interface Schema {
  home_page: {
    hero: Hero[]
    hero_button_url: string
  }
}
const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      home_page {
        hero_button_url
        hero(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          languages_code {
            code
          }
          headline
          text
          sub_headline
          button_text
        }
      }
    }
  `)
}

export default async function Header() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang)
  // ==================================================

  // useEffect(function () {
  //   client.query<Post[]>(`
  //     query{
  //   home_page {
  //     hero(filter: {languages_code: {code: {_eq: "ar"}}}) {
  //       languages_code {
  //         code
  //       }
  //       headline
  //       text
  //       sub_headline
  //     }
  //   }
  //   services {
  //     icon
  //     user_updated
  //   }
  // }
  //     `).then(console.log);
  // },[])

  // -------------------------

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        pt: { xs: 5 },
        height: '100vh',
        textAlign: 'center',
        alignItems: { sx: 'end', md: 'center' },
      }}
      className={styles.headerPage}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            mt: { xs: 9 },
            color: '#fff',
            textTransform: 'uppercase',
            fontSize: { xs: '2.0rem', md: '4rem' },
            background:
              'linear-gradient(to right, #FDFDFD, #FDFDFD, #0000FE, #0000FE )',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {data?.home_page?.hero?.[0]?.headline ?? ''}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            my: 3,
            color: '#fff',
            fontSize: { xs: '25px', md: '35px' },
            fontWeight: 600,
            lineHeight: '56px',
          }}
        >
          {data?.home_page?.hero?.[0]?.sub_headline ?? ''}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            width: { sx: '80%', md: '70%' },
            mx: 'auto',
            color: 'rgba(179,185,198,1)',
            fontSize: { sx: '20px', md: '24px' },
            fontWeight: 400,
            lineHeight: '33.6px',
          }}
        >
          {data?.home_page?.hero?.[0]?.text ?? ''}
        </Typography>

        <Button
          sx={{
            backgroundColor: 'rgba(132, 17, 230, 1)',
            color: '#fff',
            padding: { sx: '15px 25px', md: '15px 25px' },
            fontWeight: { sx: '600', md: '600' },
            lineHeight: '22.4px',
            my: 5,
          }}
          target="_blank"
          href={data?.home_page?.hero_button_url}
        >
          {data?.home_page?.hero?.[0]?.button_text ?? ''}
        </Button>
      </Box>
    </Box>
  )
}
