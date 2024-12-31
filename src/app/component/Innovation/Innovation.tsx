import React from 'react'
import { Box, Typography } from '@mui/material'

import { createDirectus, graphql } from '@directus/sdk'
import ReactMarkdown from 'react-markdown';
import { getCookie } from '@/app/utils/helper/helper';
import { getLocale } from 'next-intl/server';

interface Translations {
  languages_code: { code: string }
  title: string
  content: string
}

interface Page {
  translations: Translations[]
}

interface Schema {
  about: Page
}

const BASE_URL = process.env.NEXT_APP_API_BASE_URL as string
const client = createDirectus<Schema>(BASE_URL).with(graphql())

async function HomeData(locale: string) {
  return await client.query<Schema>(`
    query{
      about: pages_by_id(id: "fe1a2319-93dc-4d04-9785-38fdc53dec3d") {
        translations(filter: {languages_code: {code: {_eq: "${locale}"}}}) {
          title
          content
        }
      }
    }
  `)
}

export default async function Innovation() {
  const locale = getCookie('NEXT_LOCALES') || (await getLocale())
  const lang = locale === 'ar' ? 'ar' : 'en'
  let data = await HomeData(lang) 
  const title = data?.about?.translations[0]?.title;
  const content = data?.about?.translations[0]?.content;
 
  return (
    <Box bgcolor="#010715" sx={{ p: { xs: 3, md: 7 }, px: { md: 10 } }}>
      <Box sx={{ width: { xs: '100%', md: '70%' } }}>
        {title && content && (
          <Box sx={{ py: 6 }}>
            <Typography sx={{ color: '#fff' }}>
              {/* Render Markdown content here */}
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '20px',
                        marginBottom: '16px',
                      }}
                      {...props}
                    >
                      <h1
                        style={{
                          marginInlineEnd: '10px',
                        }}
                      >
                        {props.children}
                      </h1>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29 0C29.4371 15.8316 42.1684 28.5629 58 29C42.1684 29.4371 29.4371 42.1684 29 58C28.5629 42.1684 15.8316 29.4371 0 29C15.8316 28.5629 28.5629 15.8316 29 0Z"
                          fill="#8411E6"
                        />
                      </svg>
                    </div>
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      style={{
                        fontWeight: 800,
                        fontSize: '35px',
                        marginBottom: '16px',
                        color: '#C078FE',
                      }}
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      style={{
                        color: '#C078FE',
                        fontWeight: 800,
                        fontSize: '30px',
                        marginBottom: '16px',
                      }}
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      style={{
                        color: '#fff',
                        fontSize: '18px',
                        lineHeight: 1.8,
                        marginBottom: '16px',
                      }}
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      style={{
                        color: '#C078FE',
                        textDecoration: 'underline',
                        fontWeight: 600,
                      }}
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      style={{
                        paddingLeft: '1.5em',
                        marginBottom: '16px',
                      }}
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li
                      style={{
                        color: '#fff',
                        fontSize: '18px',
                        marginBottom: '8px',
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
