"use client";
import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = { firstName: "", email: "", message: "" };
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = t("contactform.FirstNameRequired");
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = t("contactform.EmailRequired");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("contactform.EmailInvalid");
      isValid = false;
    }
    if (!message.trim()) {
      newErrors.message = t("contactform.MessageRequired");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      email,
      message,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const res = await fetch("/api/sendContactMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setError("");
      } else {
        setError(data.errorMessage);
        setSuccess(false);
      }
    } catch (error) {
      setError("An error occurred while sending the message");
      setSuccess(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel sx={{ marginBottom: "15px" }}>
              {t("form.FirstName")}
            </InputLabel>
            <TextField
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ mb: 2 }}
              placeholder="please enter your first name"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel sx={{ marginBottom: "15px" }}>
              {t("form.LastName")}
            </InputLabel>
            <TextField
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              sx={{ mb: 2 }}
              placeholder="please enter your last name"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel sx={{ marginBottom: "15px" }}>
              {t("form.Email")}
            </InputLabel>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
              placeholder="please enter your email"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <InputLabel sx={{ marginBottom: "15px" }}>
              {t("form.Message")}
            </InputLabel>
            <TextField
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              error={!!errors.message}
              helperText={errors.message}
              multiline
              rows={4}
              sx={{ mb: 2 }}
              placeholder="please enter your message"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: theme.customColors.button,
                  color: theme.customColors.text,
                  px: [4, 8],
                  fontSize: ["10px", "20px"],
                }}
              >
                {t("form.Submit")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      {success && (
        <Typography sx={{ mt: 2, color: "green" }}>
          {t("contactform.Message_sent_successfully")}
        </Typography>
      )}
      {error && (
        <Typography sx={{ mt: 2, color: "red" }}>Error: {error}</Typography>
      )}
    </Container>
  );
}
