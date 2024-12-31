"use client";

import React, { useState, useTransition } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { getCookie } from "@/app/utils/helper/helper";

const items = [
  {
    value: "en",
    label: "En",
  },
  {
    value: "ar",
    label: "Ar",
  },
];

export default function LocaleSwitcherSelect() {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const locale = getCookie("NEXT_LOCALES") || "en";
  const [isPending, startTransition] = useTransition();
  const [selectedValue, setSelectedValue] = useState<string>(locale);
  const handleChange = (event: SelectChangeEvent<string>) => {
    const locale = event.target.value as Locale;
    setSelectedValue(locale);
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <FormControl
      sx={{
        borderRadius: "8px",
        backgroundColor: theme.palette.secondary.main,
        marginInlineStart: "16px",
        width: "60px",
      }}
      className="lang-form"
    >
      <Select
        sx={{
          borderRadius: "8px",
          backgroundColor: theme.palette.secondary.main,
          height: "39px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        value={selectedValue}
        onChange={handleChange}
        disabled={isPending}
        renderValue={(value) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginTop: "3px",
                fontSize: "15px",
              }}
            >
              {items?.find((item) => item?.value == value)?.label}
            </span>
          </div>
        )}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: "5px",
              borderRadius: "10px",
              "& .MuiMenuItem-root": {
                marginTop: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          },
        }}
      >
        {items?.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            <Typography sx={{ marginTop: "10px" }}>{item.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
