import { useState, useRef } from 'react';
import type {KeyboardEvent, DragEvent, ClipboardEvent} from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachIcon,
  CameraAlt as CameraIcon,
} from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import type{ AttachedFile } from '../../types';
import FileAttachment from './FileAttachment';

interface MessageInputProps {
  onSendMessage: (message: string, attachments?: AttachedFile[]) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || attachedFiles.length > 0) {
      onSendMessage(message.trim(), attachedFiles.length > 0 ? attachedFiles : undefined);
      setMessage('');
      setAttachedFiles([]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: AttachedFile[] = Array.from(files).map((file) => ({
      id: uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));

    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    const files: File[] = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }

    if (files.length > 0) {
      e.preventDefault();
      const fileList = new DataTransfer();
      files.forEach((file) => fileList.items.add(file));
      handleFileSelect(fileList.files);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleRemoveAllFiles = () => {
    setAttachedFiles([]);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        p: 3,
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <Paper
          elevation={0}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(79, 70, 229, 0.08)',
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}>
              📁 Drop files here
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Release to attach files to your message
            </Typography>
          </Box>
        </Paper>
      )}

      <Box sx={{ maxWidth: '900px', mx: 'auto', position: 'relative' }}>
        <FileAttachment
          files={attachedFiles}
          onRemoveFile={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
        />

        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1,
            p: 1.5,
            border: '1px solid',
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: '12px',
            backgroundColor: 'background.paper',
            transition: 'border-color 0.2s',
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelect(e.target.files)}
          />

          <IconButton
            size="small"
            onClick={handleAttachClick}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'rgba(79, 70, 229, 0.08)',
              },
            }}
          >
            <AttachIcon />
          </IconButton>

          <IconButton
            size="small"
            disabled
            sx={{
              color: 'text.disabled',
            }}
          >
            <CameraIcon />
          </IconButton>

          <TextField
            ref={textFieldRef}
            fullWidth
            multiline
            maxRows={4}
            placeholder="Ask me a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '14px',
              },
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
              {message.length}/10000
            </Typography>
            <IconButton
              onClick={handleSend}
              disabled={!message.trim() && attachedFiles.length === 0}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                width: 36,
                height: 36,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '&:disabled': {
                  backgroundColor: 'action.disabledBackground',
                  color: 'action.disabled',
                },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageInput;
