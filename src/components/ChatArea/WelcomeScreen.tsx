import { Box, Typography } from '@mui/material';
import QuickActionCards from '../QuickActions/QuickActionCards';

interface WelcomeScreenProps {
  onQuickAction: (message: string) => void;
}

const WelcomeScreen = ({ onQuickAction }: WelcomeScreenProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 4,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          👋 Hi Laurence!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          What do you want to learn today?
        </Typography>
      </Box>

      <QuickActionCards onActionClick={onQuickAction} />
    </Box>
  );
};

export default WelcomeScreen;