import {
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Phone,
  Twitter,
} from '@mui/icons-material';
import Image from 'next/image'
import { Box, Button, IconButton, Stack, Typography} from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { createDirectus, graphql } from '@directus/sdk'

interface Social {
  url: string
  name: string
}

interface Translation {
  footer_statement: string
  contact_us_text: string
}

interface SiteSettings {
  logo: { id: string }
  phone: string
  email: string
  socials: Social[]
  translations: Translation[]
}

interface Page {
  translations: {
    title: string
    content: string
  }[]
}

interface Schema {
  site_settings: SiteSettings
  pages: Page[]
}

const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())
async function HomeData() {
  return await client.query<Schema>(`
    query{
      site_settings{
        logo {
          id
        }
        phone
        email
        socials
        translations{
          footer_statement
          contact_us_text
        }
      }
      pages{
        translations(filter: {languages_code: {code: {_eq: "ar"}}}) {
          title
          content
          
        }
      }
    }
  `)
}

export default async function Footer() {
  let data = await HomeData()

  function getSocialIcon(name: string) {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <Facebook />
      case 'instagram':
        return <Instagram />
      case 'twitter':
        return <Twitter />
      case 'linkedin':
        return <LinkedIn />
      default:
        return null
    }
  }


  return (
    <Box
      component="footer"
      sx={{
        position: '',
        bottom: '0',
        left: 0,
        right: 0,
        backgroundColor: '#0c00ff',
        color: '#fff',
        px: 0,
      }}
    >
      <Box sx={{ maxWidth: '100%', px: 0 }}>
        <Box sx={{ py: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Box fontWeight="bold" sx={{ mb: 1 }}>
              <Image
                src={`${BASE_URL}/assets/${data?.site_settings?.logo?.id}`}
                alt="Zenith Digital Space Logo"
                width="400"
                height="300"
              />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: '17px' } }}
              textAlign="center"
            >
              {data?.site_settings?.translations[0]?.footer_statement}
            </Typography>
          </Box>

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

          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Phone />
              <Button href={`tel:${data?.site_settings?.phone}`}>
                <Typography sx={{ color: 'white' }}>
                  {data?.site_settings?.phone}
                </Typography>
              </Button>
            </Box>
            <Box display="flex" alignItems="center" gap={1} my={2}>
              <Mail />
              <Button href={`mailto:${data?.site_settings?.email}`}>
                <Typography sx={{ color: 'white' }}>
                  {data?.site_settings?.email}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTop="1px solid #fff"
          py={3}
          flexDirection={{ xs: 'column', md: 'row' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          <Typography variant="body2" sx={{ px: 3, mb: { xs: 2, md: 0 } }}>
            Copyright &copy; {new Date().getFullYear()} Zenith Digital Space
          </Typography>

          <Typography
            sx={{
              borderLeft: { md: '0.1px solid rgba(255, 255, 255, 1)' },
              px: 3,
              mb: { xs: 2, md: 0 },
            }}
          >
            <Link href="#" style={{ textDecoration: 'none', color: '#fff' }}>
              {data?.pages?.[1]?.translations?.[0]?.title}
            </Link>
          </Typography>

          <Typography
            sx={{
              borderLeft: { md: '0.1px solid rgba(255, 255, 255, 1)' },
              px: 3,
              mb: { xs: 2, md: 0 },
            }}
          >
            <Link href="#" style={{ textDecoration: 'none', color: '#fff' }}>
              {data?.pages?.[0]?.translations[0]?.title}
            </Link>
          </Typography>

          <Typography
            sx={{
              borderLeft: { md: '0.1px solid rgba(255, 255, 255, 1)' },
              px: 3,
              mb: { xs: 2, md: 0 },
            }}
          >
            <Link href="#" style={{ textDecoration: 'none', color: '#fff' }}>
              {data?.pages?.[3]?.translations?.[0]?.title}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
