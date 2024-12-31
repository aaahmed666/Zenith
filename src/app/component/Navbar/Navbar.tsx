"use client";
import React, { useState, useEffect, MouseEvent, KeyboardEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, useTheme } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { useTranslations } from "next-intl";

const Navbar: React.FC = () => {
  const t = useTranslations();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("transparent");
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const pages = [
    { title: t("navbar.HOME"), path: "/" },
    { title: t("navbar.ABOUT US"), path: "/about" },
    { title: t("navbar.What we do"), path: "/whatWeDo" },
    { title: t("navbar.Technical expertise"), path: "/technical" },
    { title: t("navbar.Blog"), path: "/blog" },
  ];

  useEffect(() => {
    let normalizedPath = pathname.replace(/\/+$/, "");
    if (normalizedPath === "") normalizedPath = "/";

    const currentPage = pages.find((page) => page.path === normalizedPath);
    if (currentPage) {
      setActivePage(currentPage.title);
    }
  }, [pathname]);

  const toggleDrawer =
    (open: boolean) =>
    (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      if (
        event.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleNavClick = (page: { title: string; path: string }) => {
    setDrawerOpen(false);
    if (pathname !== page.path) {
      router.push(page.path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setBgColor(
        window.scrollY > 50 ? `${theme.customColors.accent}` : "transparent"
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: { xs: theme.customColors.accent, md: bgColor },
        padding: { xs: "0px 15px", md: "0px 45px" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between" }}
        >
          <Typography
            component="a"
            href="/"
            sx={{ display: "flex" }}
          >
            <img
              src="/Vectorlogo.png"
              style={{ width: "40px" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  backgroundColor: theme.customColors.accent,
                  color: theme.palette.secondary.main,
                  width: 250,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {pages?.map((page) => (
                  <ListItem
                    key={page.title}
                    onClick={() => handleNavClick(page)}
                    sx={{
                      border:
                        activePage === page.title
                          ? `1px solid ${theme.customColors.primary}`
                          : "1px solid transparent",
                      "&:hover": {
                        border: `1px solid ${theme.customColors.primary}`,
                      },
                    }}
                    component="div"
                  >
                    <ListItemText
                      primary={page.title}
                      sx={{ textAlign: "center", cursor: "pointer" }}
                    />
                  </ListItem>
                ))}
                <Box sx={{ flexGrow: 1 }} />
                <Link
                  href="/contactUs"
                  sx={{
                    textAlign: "center",
                    width: "70%",
                    color: theme.palette.secondary.main,
                    border: `1px solid ${theme.customColors.primary}`,
                    my: 2,
                    py: 1,
                    mx: "auto",
                  }}
                >
                  {t("navbar.Contact_Us")}
                </Link>
              </List>
            </Drawer>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages?.map((page) => (
              <Typography
                key={page.title}
                onClick={() => handleNavClick(page)}
                sx={{
                  px: 1,
                  pb: 1,
                  mx: 1,
                  color:
                    activePage === page.title
                      ? theme.palette.secondary.main
                      : theme.customColors.navbar,
                  cursor: "pointer",
                  borderBottom:
                    activePage === page.title
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid transparent",
                  "&:hover": {
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {page.title}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              href="/contactUs"
              sx={{
                color: theme.palette.secondary.main,
                border: `1px solid ${theme.customColors.primary}`,
                display: { xs: "none", md: "flex" },
                padding: "8px 14px",
              }}
            >
              {t("navbar.Contact_Us")}
            </Button>
            <LocaleSwitcherSelect />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
