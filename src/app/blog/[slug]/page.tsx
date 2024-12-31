'use client'
import { useParams } from 'next/navigation'
import { Box, Stack, Avatar, Button, IconButton, Link } from '@mui/material';
import RelatedTopics from '@/app/component/RelatedTopics/RelatedTopics';
import LeaveReply from '@/app/component/LeaveReply/LeaveReply';
import Contents from '@/app/component/Content/Contents';

const BlogDetail = () => {
  const { slug } = useParams()
  return (
    <>
      <Box sx={{ bgcolor: '#010715', color: 'white', pt: 9 }}>
        <Contents slug={slug as string} />
        <LeaveReply />
        <RelatedTopics />
      </Box>
    </>
  )
}

export default BlogDetail
