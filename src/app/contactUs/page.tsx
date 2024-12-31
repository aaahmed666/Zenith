import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from '@mui/icons-material'
import { Box, Typography, Link, CardMedia, Button, IconButton, Stack, Container } from '@mui/material'
import React from 'react'
import ContactForm from '../component/ContactForm/ContactForm'
import ContactFormText from '../component/ContactFormText/ContactFormText'
import styles from '../component/Header/Header.module.css';

import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '../utils/helper/helper'
import { getLocale } from 'next-intl/server'

interface Translations {
  languages_code: { code: string }
  contactus_page_title: string
  contactus_page_content_title: string
  contactus_page_content_text: string
  contact_us_subtitle: string
  contactus_page_intro: string
  contactus_page_title_2: string
}

interface StaticContentTexts {
  translations: Translations[]
}
interface Social {
  url: string
  name: string
}
interface SiteSettings {
  socials: Social[]
}
interface Schema {
  static_content_texts: StaticContentTexts
  site_settings: SiteSettings
}

const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      site_settings{
        socials
      }
      static_content_texts{ 
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}){
          contactus_page_title
          contactus_page_content_title  
          contactus_page_content_text 
          contact_us_subtitle
          contactus_page_intro
          contactus_page_title_2
        }
      }
    }
  `)
}


export default async function ContactUs() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang) 
  const staticContent = data?.static_content_texts?.translations?.[0] || {}

    function getSocialIcon(name: string) {
      switch (name.toLowerCase()) {
        case 'facebook':
          return <Facebook sx={{fontSize : '40px' }}/>
        case 'instagram':
          return <Instagram sx={{fontSize : '40px' }}/>
        case 'twitter':
          return <Twitter sx={{fontSize : '40px' }}/>
        case 'linkedin':
          return <LinkedIn sx={{fontSize : '40px' }}/>
        default:
          return null
      }
    }
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
            {staticContent?.contactus_page_title ?? ''}
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
            {staticContent?.contactus_page_intro ?? ''}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              my: 5,
              width: { xs: '95%', md: '70%' },
              mx: 'auto',
              color: '#fff',
              fontSize: { xs: '16px', md: '25px' },
              fontWeight: 600,
              lineHeight: '33.6px',
            }}
          >
            {staticContent.contactus_page_title_2}
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ mx: 'auto' }}>
            <CardMedia
              component="img"
              image="./LinkedPathGroup.png"
              alt="LinkedPathGroup"
              // height="320"
              sx={{ width: '150px' }}
            />
          </Box>
        </Box>
      </Box>

      {/* <Box
        sx={{ width: { md: '60%' }, mx: 'auto' }}
        padding={4}
        textAlign="center"
      > */}
      <Container sx={{ my: 5, textAlign: "center" }}>
        <ContactFormText />
        <ContactForm />
      </Container>
      {/* </Box> */}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: '#010715',
          textAlign: 'center',
          py: 5,
          height: { md: '70vh' },
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              my: 3,
              color: '#fff',
              fontSize: { xs: '25px', md: '32px' },
              fontWeight: 600,
              lineHeight: '56px',
            }}
          >
            {staticContent.contactus_page_content_title}
          </Typography>

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
            {staticContent.contactus_page_content_text}
          </Typography>

          <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
            {data?.site_settings?.socials?.map((social, index) => (
              <Button
                key={index}
                href={social?.url ?? '#'}
                target="_blank"
                sx={{ color: 'white', padding: '0px', margin: '0px' }}
              >
                <IconButton aria-label={social?.name} color="inherit">
                  {getSocialIcon(social?.name)}
                </IconButton>
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  )
}
