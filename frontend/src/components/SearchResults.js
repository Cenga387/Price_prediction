import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const [cars, setCars] = useState([]);
  const query = useQuery();
  const keywords = query.get('keywords');

  useEffect(() => {
    if (keywords) {
      axios.get(`/search?keywords=${keywords}`)
        .then(response => {
          setCars(response.data.cars);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [keywords]);

  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{keywords}"
      </Typography>
      {cars.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 600 }}>
          {cars.map((car, index) => (
            <ListItem key={index} button>
              <ListItemText primary={car.title} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No cars found.</Typography>
      )}
    </Box>
  );
};

export default SearchResults;