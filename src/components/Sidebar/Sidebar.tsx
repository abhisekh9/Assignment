import {
  Box,
  Drawer,
  IconButton,
  Typography,
  TextField,
  Button,
  List,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  History as HistoryIcon,
  Explore as ExploreIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import ChatHistoryItem from './ChatHistoryItem';

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 80;

const Sidebar = () => {
  const {
    chats,
    activeChat,
    sidebarCollapsed,
    searchQuery,
    createNewChat,
    setActiveChat,
    toggleSidebar,
    setSearchQuery,
  } = useChatStore();

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          {!sidebarCollapsed && (
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
                  fontSize: '18px',
                }}
              >
                I
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Inteliq
              </Typography>
            </Box>
          )}
          <IconButton onClick={toggleSidebar} size="small">
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Search */}
        {!sidebarCollapsed && (
          <TextField
            placeholder="Search for chats..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* Navigation Buttons */}
        <Box sx={{ mb: 2 }}>
          <Button
            fullWidth
            startIcon={!sidebarCollapsed && <HomeIcon />}
            sx={{
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              mb: 1,
              color: 'primary.main',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {sidebarCollapsed ? <HomeIcon /> : 'Home'}
          </Button>
          <Button
            fullWidth
            startIcon={!sidebarCollapsed && <LibraryIcon />}
            sx={{
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              mb: 1,
              color: 'text.secondary',
              textTransform: 'none',
            }}
          >
            {sidebarCollapsed ? <LibraryIcon /> : 'Library'}
          </Button>
          <Button
            fullWidth
            startIcon={!sidebarCollapsed && <HistoryIcon />}
            sx={{
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              mb: 1,
              color: 'text.secondary',
              textTransform: 'none',
            }}
          >
            {sidebarCollapsed ? <HistoryIcon /> : 'History'}
          </Button>
          <Button
            fullWidth
            startIcon={!sidebarCollapsed && <ExploreIcon />}
            sx={{
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              color: 'text.secondary',
              textTransform: 'none',
            }}
          >
            {sidebarCollapsed ? <ExploreIcon /> : 'Explore'}
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Recent Chats Header */}
        {!sidebarCollapsed && (
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Recent Chats
          </Typography>
        )}

        {/* Chat History List */}
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
          <List sx={{ p: 0 }}>
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <ChatHistoryItem
                  key={chat.id}
                  chat={chat}
                  isActive={activeChat?.id === chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  collapsed={sidebarCollapsed}
                />
              ))
            ) : (
              !sidebarCollapsed && (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}
                >
                  {searchQuery ? 'No chats found' : 'No recent chats'}
                </Typography>
              )
            )}
          </List>
        </Box>

        {!sidebarCollapsed && filteredChats.length > 3 && (
          <Button
            fullWidth
            sx={{
              textTransform: 'none',
              color: 'primary.main',
              mb: 2,
            }}
          >
            View All →
          </Button>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* New Chat Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={!sidebarCollapsed && <AddIcon />}
          onClick={createNewChat}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          }}
        >
          {sidebarCollapsed ? <AddIcon /> : '+ New Chat'}
        </Button>

        {/* Try Pro Section */}
        {!sidebarCollapsed && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              border: '1px solid rgba(79, 70, 229, 0.2)',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              Try Pro!
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
              Upgrade for smarter AI and more...
            </Typography>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderColor: 'primary.main',
                color: 'primary.main',
              }}
            >
              🚀
            </Button>
          </Box>
        )}

        {/* User Profile */}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            p: sidebarCollapsed ? 1 : 2,
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              L
            </Box>
            {!sidebarCollapsed && (
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Lawrence Cruz
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
