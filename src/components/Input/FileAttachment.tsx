import { Box, IconButton, Typography, Paper} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { AttachedFile } from '../../types';

interface FileAttachmentProps {
  files: AttachedFile[];
  onRemoveFile: (fileId: string) => void;
  onRemoveAll: () => void;
}

const FileAttachment = ({ files, onRemoveFile, onRemoveAll }: FileAttachmentProps) => {
  if (files.length === 0) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
          px: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Attached Files
        </Typography>
        <IconButton
          size="small"
          onClick={onRemoveAll}
          sx={{
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.08)',
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {files.map((file) => (
          <Paper
            key={file.id}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              backgroundColor: 'rgba(79, 70, 229, 0.05)',
              border: '1px solid',
              borderColor: 'rgba(79, 70, 229, 0.2)',
              borderRadius: '8px',
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '6px',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: '18px' }}>📎</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {file.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {(file.size / 1024).toFixed(1)} KB
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={() => onRemoveFile(file.id)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'error.main',
                  backgroundColor: 'rgba(211, 47, 47, 0.08)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default FileAttachment;
