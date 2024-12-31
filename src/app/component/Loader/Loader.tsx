import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  loading: boolean;
  error: string | null;
}

export default function Loader({ loading = false, error = null }: LoaderProps) {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        sx={{ py: 12 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h3"
        sx={{ fontSize: "14px", fontWeight: 400, textAlign: "center" }}
        color="error"
      >
        {error}
      </Typography>
    );
  }

  return null;
}
