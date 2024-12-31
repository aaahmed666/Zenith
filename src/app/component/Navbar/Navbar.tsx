'use client'
import React, { useState, useEffect, MouseEvent, KeyboardEvent } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { FormControl, Select, MenuItem, SelectChangeEvent, Link } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { useAppContext } from '@/context'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'
import { useTranslations } from 'next-intl'

const Navbar: React.FC = () => {
  const t = useTranslations()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activePage, setActivePage] = useState<string>('')
  const [bgColor, setBgColor] = useState<string>('transparent')
  const [language, setLanguage] = useState<string>('en')
  const pathname = usePathname()
  const router = useRouter()

  // const pages = [
  //   { title: 'HOME', path: '/' },
  //   { title: 'ABOUT US', path: '/about' },
  //   { title: 'What we do', path: '/whatWeDo' },
  //   { title: 'Technical expertise', path: '/technical' },
  //   { title: 'Blog', path: '/blog' },
  // ]
  const pages = [
    { title: t('navbar.HOME'), path: '/' },
    { title: t('navbar.ABOUT US'), path: '/about' },
    { title: t('navbar.What we do'), path: '/whatWeDo' },
    { title: t('navbar.Technical expertise'), path: '/technical' },
    { title: t('navbar.Blog'), path: '/blog' },
  ]
  // const handleLanguageChange = (event: SelectChangeEvent) => {
  //   setLanguage(event.target.value as string)
  // }

  const { lang, setLang } = useAppContext()

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLang = event.target.value as string
    setLang(selectedLang)
    // if (i18n.language !== selectedLang) {
    //   i18n.changeLanguage(selectedLang) // Update language dynamically
    // }
  }

  useEffect(() => {
    let normalizedPath = pathname.replace(/\/+$/, '')
    if (normalizedPath === '') normalizedPath = '/'

    const currentPage = pages.find((page) => page.path === normalizedPath)
    if (currentPage) {
      setActivePage(currentPage.title)
    }
  }, [pathname])

  const toggleDrawer =
    (open: boolean) =>
    (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      if (
        event.type === 'keydown' &&
        'key' in event &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return
      }
      setDrawerOpen(open)
    }

  const handleNavClick = (page: { title: string; path: string }) => {
    setDrawerOpen(false)
    if (pathname !== page.path) {
      router.push(page.path)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setBgColor(window.scrollY > 50 ? '#010715' : 'transparent')
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: { xs: '#010715', md: bgColor },
        padding: { xs: '0px 15px', md: '0px 45px' },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            component="a"
            href="/"
            sx={{ display: { xs: 'flex', md: 'flex' } }}
          >
            <img src="/Vectorlogo.png" style={{ width: '40px' }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <List
                sx={{
                  backgroundColor: '#010715',
                  color: '#fff',
                  width: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {pages?.map((page) => (
                  <ListItem
                    key={page.title}
                    onClick={() => handleNavClick(page)}
                    sx={{
                      border:
                        activePage === page.title
                          ? '1px solid #0000FE'
                          : '1px solid transparent',
                      '&:hover': {
                        border: '1px solid #0000FE',
                      },
                    }}
                    component="div"
                  >
                    <ListItemText
                      primary={page.title}
                      sx={{ textAlign: 'center', cursor: 'pointer' }}
                    />
                  </ListItem>
                ))}
                <Box sx={{ flexGrow: 1 }} />{' '}
                {/* Spacer to push Contact Us to bottom */}
                <Link
                  href="/contactUs"
                  sx={{
                    textAlign:"center",
                    width: '70%',
                    color: '#fff',
                    border: '1px solid #0000FE',
                    my:2,
                    py:1,
                    mx: 'auto',
                  }}
                >
                {/* <Button
                  href="/contactUs"
                  sx={{
                    width: '70%',
                    m: 1,
                    mx: 'auto',
                    color: '#fff',
                    border: '1px solid #0000FE',
                    display: { xs: 'none', md: 'flex' },
                  }}
                > */}
                  Contact Usaa
                {/* </Button> */}
                </Link>
              </List>
            </Drawer>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages?.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleNavClick(page)}
                sx={{
                  my: 2,
                  px: 2,
                  color: 'white',
                  borderBottom:
                    activePage === page.title
                      ? '2px solid #8411E6'
                      : '2px solid transparent',
                  '&:hover': {
                    borderBottom: '2px solid #8411E6',
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              href="/contactUs"
              sx={{
                color: '#fff',
                border: '1px solid #0000FE',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {t('navbar.Contact_Us')}
            </Button>

            {/* <FormControl sx={{ minWidth: 60 }}>
              <Select
                value={lang}
                onChange={handleLanguageChange}
                displayEmpty
                sx={{
                  width: '70px',
                  height: '40px',
                  border: '1px solid #0000FE',
                  color: '#fff',
                  backgroundColor: 'transparent',
                  '& .MuiSelect-icon': { color: '#fff' },
                }}
              >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="ar">AR</MenuItem>
              </Select>
            </FormControl> */}

            <LocaleSwitcherSelect />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
