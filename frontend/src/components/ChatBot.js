import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Chatbot = ({mode}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatListRef = useRef(null);  

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // Handle form submission
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      sender: 'User',
      text: inputMessage
    };

    setMessages([...messages, newMessage]);

    try {
      // Send the user message to the backend
      const response = await axios.post('http://localhost:5000/chatbot', {
        message: inputMessage,
      });

      // Extract the response from the backend
      const botResponse = {
        sender: 'Bot',
        text: response.data.response,
      };

      setMessages([...messages, newMessage, botResponse]);
      setInputMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, newMessage, { sender: 'Bot', text: 'Error communicating with the server.' }]);
    }
  };

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000}}>
      {/* Chat button to open/close the chat window */}
      {!isOpen && (
        <IconButton color="primary" onClick={toggleChat} sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#f0f0f0' }, width: 50, height: 50 }}>
          <ChatBubbleOutlineIcon sx={{ width: 35, height: 35 }} />
        </IconButton>
      )}

      {/* Chat window */}
      {isOpen && (
        <Paper elevation={4} sx={{ width: 400, height: 500, display: 'flex', flexDirection: 'column', borderTopRightRadius: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: mode === 'dark' ? 'grey.900': 'primary.main', borderTopRightRadius: 15, borderTopLeftRadius: 15}}>
            <Typography variant="h6" color='white'>Car Genie</Typography>
            <IconButton onClick={toggleChat} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box ref={chatListRef} sx={{ flex: 1, p: 2, overflowY: 'auto', backgroundColor: mode === 'dark' ? 'grey.800' : '#fafafa' }}>
            <List>
              {messages.map((message, index) => (
                <ListItem key={index} sx={{ justifyContent: message.sender === 'User' ? 'flex-end' : 'flex-start' }}>
                  <ListItemText
                    primary={message.text}
                    primaryTypographyProps={{
                      align: message.sender === 'User' ? 'right' : 'left',
                      color: message.sender === 'User' ? 'primary' : 'primary',
                    }}
                    sx={{
                      backgroundColor: message.sender === 'User' ? (mode === 'dark' ? 'grey.700' : '#e3f2fd'): (mode === 'dark' ? 'grey.700' : '#e3f2fd'),
                      borderRadius: 1,
                      p: 1,
                      maxWidth: '90%'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center',  justifyContent: 'center', height: 70, backgroundColor: mode === 'dark' ? 'grey.900' : 'white', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
            <TextField
                label="Ask any car-related question"
                variant="outlined"
                size='small'
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                sx={{ minWidth: '70%'}} 
                InputProps={{
                    sx:{borderRadius: 15}
                }}
            />
            <Button 
                variant="contained" 
                size='medium' 
                onClick={handleSendMessage} 
                sx={{ ml: 1, borderRadius: 15}}
            >
                Send
            </Button>
            </Box>

        </Paper>
      )}
    </Box>
  );
};

export default Chatbot;
