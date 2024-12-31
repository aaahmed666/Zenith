import React from 'react'
import { Box, Typography } from '@mui/material'
import Sliders from '../Slider/Slider'
import Grid from '@mui/material/Grid2'
import { createDirectus, graphql } from '@directus/sdk'
import { getCookie } from '@/app/utils/helper/helper'
import { getLocale } from 'next-intl/server'

interface Translations {
  languages_code: { code: string }
  title: string
  excerpt: string
  our_services_title: string
  our_services_text: string
}

interface Service {
  translations: Translations[]
  icon: { id: string }
}

interface StaticContentTexts {
  translations: Translations[]
}

interface Schema {
  services: Service[]
  static_content_texts: StaticContentTexts
}

const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      services {
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          title
          excerpt
        }
        icon{
          id
        }    
      }
      static_content_texts{ 
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          our_services_title
          our_services_text
        }
      }
    }
  `)
}

export default async function ServicesSection() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang)
  const staticContent = data?.static_content_texts?.translations?.[0] || {}

  const services = data?.services.map((item) => ({
    icon: `${BASE_URL}/assets/${item.icon?.id}`,
    title: item.translations[0]?.title,
    description: item.translations[0]?.excerpt,
  }))

  return (
    <Box py={8} bgcolor="#010715" color="white" textAlign="center">
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        marginBottom={4}
      >
        <Box mx={2}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
              fill="#0000FE"
            />
          </svg>
        </Box>
        <Typography
          sx={{
            fontSize: ['20px', '40px'],
            fontWeight: 600,
          }}
          variant="h4"
        >
          {staticContent?.our_services_title}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        marginBottom={4}
        sx={{
          width: { xs: '90%', md: '50%' },
          mx: 'auto',
          color: '#B3B9C6',
          fontSize: ['12px', '24px'],
        }}
      >
        {staticContent?.our_services_text}
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
      >
        <Sliders services={services} />

        {/* {services.map((service, i) => (
          <Grid size={{ xs: 12, md: 3 }} key={i}>
            <Card sx={{ bgcolor: 'transparent', border:'1px solid', borderImageSource: 'linear-gradient(180deg, #8411E6 0%, #0000FE 100%)', borderImageSlice:1, color:'#fff', py:3, width:'350px'}}>
              <Box>
                <img style={{width:'15%'}} src={service.icon} alt="" />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{fontSize:'17px'}}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{px:4}} color="gray" gutterBottom>
                  {service.description}
                </Typography>
                <Button sx={{bgcolor:"#0000EF", color:'#fff', px:3, py:1, my:3  }}>
                  Explore More
                </Button>
              </CardContent>
            </Card>
          </Grid>
      ))} */}
      </Grid>
    </Box>
  )
}
