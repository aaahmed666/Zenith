import { Box, CardContent, Typography, Button, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'

import { createDirectus, graphql } from '@directus/sdk';
import { getLocale } from 'next-intl/server';
import { getCookie } from '@/app/utils/helper/helper';

interface Translations {
  languages_code: { code: string }
  title: string
  excerpt: string
  content: string
}

interface Translation {
  languages_code: { code: string }
  what_we_do_fields_title: string
  what_we_do_fields_text: string
}

interface Service {
  translations: Translations[]
  image: { id: string }
}

interface StaticContentTexts {
  translations: Translation[]
}

interface Schema {
  fields: Service[]
  static_content_texts: StaticContentTexts
}

const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      static_content_texts{ 
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          what_we_do_fields_title
          what_we_do_fields_text
        }
      }
      fields{
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          content
          title
          excerpt
        }
        image{
          id
        }
      }
    }
  `)
}

export default async function FieldsSection() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang) 
  const staticContent = data?.static_content_texts?.translations?.[0] || {}

  const fields =
    data?.fields?.map((item) => ({
      icon: `${BASE_URL}/assets/${item.image?.id}`,
      title: item.translations[0]?.title,
      description: item.translations[0]?.excerpt,
    })) ?? []

  return (
    <Box display="flex" sx={{ my: 7 }}>
      {/* <Box sx={{ width: '85%', mx: 'auto', textAlign: 'center' }}> */}
        <Container>
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: ['25px', '40px'],
            fontWeight: '600',
          }}
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
              fill="#0000FE"
            />
          </svg>
          <span style={{ marginInlineStart: '15px' }}>
            {staticContent?.what_we_do_fields_title}
          </span>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            my: 3,
            width: { xs: '95%', md: '70%' },
            mx: 'auto',
            lineHeight: '33.6px',
            fontSize: ['12px', '24px'],
            fontWeight: '400',
          }}
        >
          {staticContent?.what_we_do_fields_text}
        </Typography>
        <Grid
          container
          sx={{
            // width: { xs: '90%' },
            spacing: { xs: 2, md: 5 },
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            my: 2,
          }}
        >
          {fields?.map((field, i) => (
            <Grid size={{ md: 4 }} key={i} sx={{ my: { xs: 5 } }}>
            
              <Box
                sx={{
                  position: 'relative',
                  mx: { md: 'auto' },
                  textAlign: 'center',
                  bgcolor: 'transparent',
                  border: '1px solid',
                  borderImageSource:
                    'linear-gradient(180deg, #8411E6 0%, #0000FE 100%)',
                  borderImageSlice: 1,
                  color: '#fff',
                  py: 3,
                  width: { xs: '300px', md: '350px' },
                }}
              >
                <Box
                  height="150px"
                  sx={{
                    // width: { xs: '300px', md: '350px' },
                    mx: { xs: 'auto' },
                  }}
                >
                  <img
                    style={{
                      position: 'absolute',
                      top: '-30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: '99',
                      width: '80%',
                      margin: 'auto',
                    }}
                    src={field?.icon}
                    alt=""
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontSize: ['10px', '20px'],
                      fontWeight: 600,
                      color: '#000',
                    }}
                  >
                    {field?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ px: 4, fontSize: ['7px', '16px'], fontWeight: 300 }}
                    color="gray"
                    gutterBottom
                  >
                    {field?.description}
                  </Typography>
                  <Button
                    sx={{
                      bgcolor: '#0000EF',
                      color: '#fff',
                      px: 3,
                      py: 1,
                      my: 3,
                      fontSize: ['7px', '16px'],
                      fontWeight: 600,
                    }}
                  >
                    Explore More
                  </Button>
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>

        </Container>
      {/* </Box> */}
    </Box>
  )
}
