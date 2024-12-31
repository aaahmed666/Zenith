import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'

interface CommentProps {
  name: string
  date: string
  text: string
  likes: number
  replies: number
  nested?: boolean
}

const Comment: React.FC<CommentProps> = ({
  name,
  date,
  text,
  likes,
  replies,
  nested = false,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: nested ? '#f5f5f5' : '#2D2D2D',
        color: nested ? 'black' : 'white',
        borderRadius: 2,
        padding: 2,
        marginY: nested ? 1 : 2,
        marginLeft: nested ? 4 : 0,
        width: '100%',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
        <Stack spacing={0.5}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="body2" sx={{ marginY: 1 }}>
        {text}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton size="small" color="inherit">
          <ThumbUpIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption">{likes}</Typography>
        <IconButton size="small" color="inherit">
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption">{replies}</Typography>
      </Stack>
    </Box>
  )
}

export default Comment
