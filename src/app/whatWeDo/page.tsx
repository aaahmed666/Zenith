import { Box, Typography, Link } from '@mui/material'
import styles from '../component/Header/Header.module.css'

import ServicesSection from '../component/ServicesSection/ServicesSection'
import FieldsSection from '../component/FieldsSection/FieldsSection'
import MakesDifferent from '../component/MakesDifferent/MakesDifferent'

import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '../utils/helper/helper'
import { getLocale } from 'next-intl/server'

interface Translations {
  languages_code: { code: string }
  what_we_do_title: string
  what_we_do_text: string
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
          what_we_do_title  
          what_we_do_text 
        }
      }
    }
  `)
}

export default async function whatWeDo() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang) 
  const staticContent = data?.static_content_texts?.translations?.[0] || {}

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: { md: '100vh' }, textAlign: 'center', pt: { xs: 9 } }}
        className={styles.headerPage}
      >
        <Box sx={{ pt: { xs: 9 } }}>
          <Link
            href="/about"
            sx={{
              my: 9,
              color: '#fff',
              fontSize: { xs: '40px', md: '50px' },
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
                backgroundColor: '#8411E6',
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
            {staticContent?.what_we_do_title ?? ''}
          </Link>
          <Typography
            variant="body2"
            sx={{
              my: 5,
              width: { xs: '95%', md: '70%' },
              mx: 'auto',
              color: 'rgba(179,185,198,1)',
              fontSize: { xs: '16px', md: '24px' },
              fontWeight: 400,
              lineHeight: '33.6px',
            }}
          >
            {staticContent?.what_we_do_text ?? ''}
          </Typography>
        </Box>
      </Box>

      <FieldsSection />
      <MakesDifferent />
      <ServicesSection />
    </>
  )
}
