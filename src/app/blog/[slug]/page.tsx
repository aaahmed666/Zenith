"use client";
import { useParams } from "next/navigation";
import { Box, useTheme } from "@mui/material";
import Contents from "@/app/component/Content/Contents";

const BlogDetail = () => {
  const { slug } = useParams();
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          bgcolor: theme.customColors.accent,
          color: theme.palette.secondary.main,
          py: 12,
        }}
      >
        <Contents slug={slug as string} />
      </Box>
    </>
  );
};

export default BlogDetail;
