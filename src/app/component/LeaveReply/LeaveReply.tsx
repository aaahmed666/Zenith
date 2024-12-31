"use client";

import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useTranslations } from "next-intl";

interface LeaveReplayProps {
  postId: string;
}

export default function LeaveReply({ postId }: LeaveReplayProps) {
  const t = useTranslations();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [webSite, setWebSite] = useState("");
  const [error, setError] = useState({ name: "", email: "", comment: "" });
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const errors: { name: string; email: string; comment: string } = {
      name: "",
      email: "",
      comment: "",
    };
    if (!name.trim()) errors.name = t("contactform.NameRequired");
    if (!email.trim()) errors.email = t("contactform.EmailRequired");
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = t("contactform.EmailInvalid");
    if (!comment.trim()) errors.comment = t("contactform.CommentRequired");
    setError(errors);
    return !Object.values(errors).some((err) => err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      name,
      email,
      comment,
      webSite,
      postId,
    };

    try {
      const res = await fetch("/api/sendReplayMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setError({ name: "", email: "", comment: "" });
      } else {
        setSuccess(false);
        setError((prev) => ({ ...prev, comment: data.errorMessage }));
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        comment: "An error occurred while sending the message.",
      }));
      setSuccess(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ py: 12 }}>
          <Typography
            variant="h4"
            sx={{
              my: 4,
              pb: 8,
              fontSize: ["20px", "40px"],
              fontWeight: 400,
              color: `${theme.palette.secondary.main} !important`,
              textAlign: "center",
            }}
          >
            {t("leaveReply.LeaveReply")}
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{ mx: "auto" }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel
                sx={{
                  marginBottom: "15px",
                  color: `${theme.palette.secondary.main} !important`,
                  fontSize: ["12px", "24px"],
                  fontWeight: 400,
                }}
              >
                {t("leaveReply.Name")}
              </InputLabel>
              <TextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!error.name}
                helperText={error.name}
                sx={{
                  backgroundColor: theme.customColors.border,
                  borderRadius: "10px",
                  fontSize: ["10px", "20px"],
                  fontWeight: 400,
                  borderColor: theme.customColors.border,
                  color: theme.customColors.third,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.customColors.border,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                      backgroundColor: "transparent",
                    },
                  },
                  "&:hover": {
                    backgroundColor: theme.customColors.border,
                    borderRadius: "10px",
                    borderColor: theme.customColors.border,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel
                sx={{
                  marginBottom: "15px",
                  color: `${theme.palette.secondary.main} !important`,
                  fontSize: ["12px", "24px"],
                  fontWeight: 400,
                }}
              >
                {t("leaveReply.Email")}
              </InputLabel>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error.email}
                helperText={error.email}
                sx={{
                  backgroundColor: theme.customColors.border,
                  borderRadius: "10px",
                  fontSize: ["10px", "20px"],
                  fontWeight: 400,
                  borderColor: theme.customColors.border,
                  color: theme.customColors.third,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.customColors.border,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                      backgroundColor: "transparent",
                    },
                  },
                  "&:hover": {
                    backgroundColor: theme.customColors.border,
                    borderRadius: "10px",
                    borderColor: theme.customColors.border,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <InputLabel
                sx={{
                  marginBottom: "15px",
                  color: `${theme.palette.secondary.main} !important`,
                  fontSize: ["12px", "24px"],
                  fontWeight: 400,
                }}
              >
                {t("leaveReply.WebSite")}
              </InputLabel>
              <TextField
                fullWidth
                value={webSite}
                onChange={(e) => setWebSite(e.target.value)}
                sx={{
                  backgroundColor: theme.customColors.border,
                  borderRadius: "10px",
                  fontSize: ["10px", "20px"],
                  fontWeight: 400,
                  borderColor: theme.customColors.border,
                  color: theme.customColors.third,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.customColors.border,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                      backgroundColor: "transparent",
                    },
                  },
                  "&:hover": {
                    backgroundColor: theme.customColors.border,
                    borderRadius: "10px",
                    borderColor: theme.customColors.border,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <InputLabel
                sx={{
                  marginBottom: "15px",
                  color: `${theme.palette.secondary.main} !important`,
                  fontSize: ["12px", "24px"],
                  fontWeight: 400,
                }}
              >
                {t("leaveReply.Comment")}
              </InputLabel>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                error={!!error.comment}
                helperText={error.comment}
                sx={{
                  backgroundColor: theme.customColors.border,
                  borderRadius: "10px",
                  fontSize: ["10px", "20px"],
                  fontWeight: 400,
                  borderColor: theme.customColors.border,
                  color: theme.customColors.third,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.customColors.border,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                      backgroundColor: "transparent",
                    },
                  },
                  "&:hover": {
                    backgroundColor: theme.customColors.border,
                    borderRadius: "10px",
                    borderColor: theme.customColors.border,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                    px: 8,
                    fontSize: ["10px", "20px"],
                    my: 4,
                  }}
                >
                  {t("leaveReply.submitComment")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>

      {success && (
        <Typography sx={{ mt: 2, color: "green" }}>
          {t("contactform.Message_sent_successfully")}
        </Typography>
      )}
    </>
  );
}
