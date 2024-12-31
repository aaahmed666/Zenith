'use client'

import React, { useState, useTransition } from 'react'
import {
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  useMediaQuery,
  Typography,
} from '@mui/material'
import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/services/locale'
import { getCookie } from '@/app/utils/helper/helper'

const items = [
  {
    value: 'en',
    // label: 'English',
    label: 'En',

  },
  {
    value: 'ar',
    // label: 'Arabic',
    label: 'Ar',

  },
  {
    value: 'fr',
    // label: 'French',
    label: 'Fre',
  },
  {
    value: 'de',
    // label: 'German',
    label: 'Ger',

  },
  {
    value: 'in',
    // label: 'India',
    label: 'In',
  
  },
  {
    value: 'pk',
    label: 'Urdu',
  },
]

export default function LocaleSwitcherSelect() {
  const isLargeScreen = useMediaQuery('(min-width:600px)')

  const locale = getCookie('NEXT_LOCALES') || 'en'
  const [isPending, startTransition] = useTransition()
  const [selectedValue, setSelectedValue] = useState<string>(locale)
  const handleChange = (event: SelectChangeEvent<string>) => {
    const locale = event.target.value as Locale
    setSelectedValue(locale)
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <FormControl
      sx={{
        borderRadius: '8px',
        backgroundColor: '#FFF',
        marginInlineStart: '16px',
        height: '39px',
        width: {
          xs: '85px',
          // sm: '150px',
        },
      }}
      className="lang-form"
    >
      <Select
        sx={{
          borderRadius: '8px',
          backgroundColor: '#FFF',
          height: '39px',
        }}
        value={selectedValue}
        onChange={handleChange}
        disabled={isPending}
        // startAdornment={isLargeScreen && <LanguageIcon />}
        renderValue={(value) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginInlineStart: isLargeScreen ? '8px' : '0px' }}>
              {items?.find((item) => item?.value == value)?.label}
            </span>
          </div>
        )}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: '5px',
              borderRadius: '10px',
              '& .MuiMenuItem-root': {
                marginTop: '5px',
              },
            },
          },
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Typography sx={{ marginInlineStart: '10px' }}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
