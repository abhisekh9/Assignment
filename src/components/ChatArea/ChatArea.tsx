import { Box, IconButton, Typography, Tooltip, Button } from '@mui/material';
import { MoreVert as MoreIcon, Share as ShareIcon } from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import WelcomeScreen from './WelcomeScreen';
import MessageList from './MessageList';
import MessageInput from '../Input/MessageInput';

const ChatArea = () => {
  const { activeChat, addMessage, createNewChat } = useChatStore();

  const handleSendMessage = (content: string, attachments?: any[]) => {
    addMessage({
      content,
      sender: 'user',
      attachments,
    });
  };

  const handleQuickAction = (message: string) => {
    handleSendMessage(message);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        height: '100vh',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            🤖
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ChatGPT 4
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Tooltip title="Share">
            <IconButton size="small">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton size="small">
              <MoreIcon />
            </IconButton>
          </Tooltip>
          
          {/* New Chat Button - Styled like in reference */}
          <Button
            variant="contained"
            onClick={createNewChat}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              px: 2.5,
              py: 0.75,
              fontSize: '14px',
            }}
          >
            + New Chat
          </Button>
        </Box>
      </Box>

      {/* Main Content Area */}
      {!activeChat || activeChat.messages.length === 0 ? (
        <WelcomeScreen onQuickAction={handleQuickAction} />
      ) : (
        <MessageList messages={activeChat.messages} />
      )}

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default ChatArea;
