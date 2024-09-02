import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Car Expert Chatbot
      </Typography>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, p: 2, mb: 2 }}>
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.sender === 'User' ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={message.text}
                primaryTypographyProps={{ 
                  align: message.sender === 'User' ? 'right' : 'left', 
                  color: message.sender === 'User' ? 'primary' : 'primary',
                }}
                sx={{ 
                  backgroundColor: message.sender === 'User' ? '#e3f2fd' : '#e3f2fd', 
                  borderRadius: 1, 
                  p: 1, 
                  maxWidth: '70%' 
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <TextField
        label="Type your message..."
        variant="outlined"
        fullWidth
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default Chatbot;
