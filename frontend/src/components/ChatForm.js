import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import Chatbot from './ChatBot';
import ChatIcon from '@mui/icons-material/Chat';

const ChatForm = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        sx={{ position: 'fixed', bottom: 16, right: 16, width: 70, height: 70 }}
      >
        <ChatIcon sx={{width: 50, height: 50}}/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Car Expert Chatbot</DialogTitle>
        <DialogContent>
          <Chatbot />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatForm;