import { Box, Card, CardContent, Typography } from '@mui/material';
// import { AutoAwesome as SparkleIcon } from '@mui/icons-material';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
}

interface QuickActionCardsProps {
  onActionClick: (title: string) => void;
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Give me a concise summary of this meeting transcript',
    icon: '✨',
  },
  {
    id: '2',
    title: 'Write a product description for a minimalist smartwatch',
    icon: '✨',
  },
  {
    id: '3',
    title: 'Provide a polite response to a customer asking for a refund',
    icon: '✨',
  },
];

const QuickActionCards = ({ onActionClick }: QuickActionCardsProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 2,
        maxWidth: '900px',
        width: '100%',
      }}
    >
      {quickActions.map((action) => (
        <Card
          key={action.id}
          onClick={() => onActionClick(action.title)}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: '20px' }}>{action.icon}</Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              {action.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default QuickActionCards;
