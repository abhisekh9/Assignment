import { Box, Typography, ListItemButton } from '@mui/material';
import type { Chat } from '../../types';

interface ChatHistoryItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
}

const ChatHistoryItem = ({ chat, isActive, onClick, collapsed }: ChatHistoryItemProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  if (collapsed) {
    return (
      <ListItemButton
        onClick={onClick}
        sx={{
          borderRadius: '8px',
          mb: 0.5,
          backgroundColor: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
          justifyContent: 'center',
          minHeight: '40px',
          '&:hover': {
            backgroundColor: isActive ? 'rgba(79, 70, 229, 0.12)' : 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            color: isActive ? 'primary.main' : 'text.secondary',
          }}
        >
          💬
        </Typography>
      </ListItemButton>
    );
  }

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: '8px',
        mb: 0.5,
        py: 1.5,
        px: 2,
        backgroundColor: isActive ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
        '&:hover': {
          backgroundColor: isActive ? 'rgba(79, 70, 229, 0.12)' : 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            color: isActive ? 'primary.main' : 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.5,
          }}
        >
          {chat.title}
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: 'text.secondary',
          }}
        >
          {formatDate(chat.updatedAt)}
        </Typography>
      </Box>
    </ListItemButton>
  );
};

export default ChatHistoryItem;
