'use client' // Add this at the top

import { createTheme, ThemeProvider } from '@mui/material'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  user: string | null
  setUser: (user: string | null) => void
  lang: string
  setLang: (lang: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null)
  const [lang, setLang] = useState<string>('ar') // Default language

  const themeObject = createTheme({
    palette: {
      primary: {
        main: '#9D2F92',
      },
      secondary: {
        main: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: 'Poppins',
      h1: {
        fontFamily: 'Poppins',
      },
      h2: {
        fontFamily: 'Poppins',
      },
      h3: {
        fontFamily: 'Poppins',
      },
      h4: {
        fontFamily: 'Poppins',
      },
      h5: {
        fontFamily: 'Poppins',
      },
      h6: {
        fontFamily: 'Poppins',
      },
    },
  })

  return (
    <AppContext.Provider value={{ user, setUser, lang, setLang }}>
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
