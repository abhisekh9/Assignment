import { Box, Typography, Paper, Avatar } from '@mui/material';
import type { Message as MessageType } from '../../types';
import { SmartToy as BotIcon, Person as PersonIcon } from '@mui/icons-material';

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.sender === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          backgroundColor: isUser ? 'primary.main' : 'secondary.main',
          flexShrink: 0,
        }}
      >
        {isUser ? <PersonIcon /> : <BotIcon />}
      </Avatar>

      <Box sx={{ flex: 1, maxWidth: '70%' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            mb: 0.5,
            display: 'block',
          }}
        >
          {isUser ? 'You' : 'Assistant'} •{' '}
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: isUser ? 'rgba(79, 70, 229, 0.08)' : 'background.paper',
            border: '1px solid',
            borderColor: isUser ? 'transparent' : 'divider',
            borderRadius: '12px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {message.content}
          </Typography>

          {message.attachments && message.attachments.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {message.attachments.map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    p: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant="body2">📎</Typography>
                  <Typography variant="body2" sx={{ flex: 1, fontSize: '13px' }}>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px' }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;
