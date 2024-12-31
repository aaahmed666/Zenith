"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, ReactNode } from "react";

interface AppContextType {}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const themeObject = createTheme({
    palette: {
      primary: {
        main: "#8411E6",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "Poppins",
      button: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
      h1: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
      h2: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
      h3: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
      h4: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
      h5: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
      h6: {
        fontFamily: "Poppins",
        textTransform: "none",
      },
      body1: {
        fontFamily: "Lemon/Milk",
        textTransform: "none",
      },
    },
    customColors: {
      secondary: "#FDFDFD",
      primary: "#0000FE",
      third: "#707070",
      text: "#000",
      button: "#DAFF23",
      divider: "#C078FE",
      accent: "#010715",
      navbar: "#B3B9C6",
      card: "#EEDBFF",
      leader: "#56565A",
      comment: "#d0cecc",
      replay: "#E5E5EA",
      footer: "#0c00ff",
      border: "#D9D9D9",
      content: "#D4D8DF",
    },
  });

  return (
    <AppContext.Provider value={{}}>
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
