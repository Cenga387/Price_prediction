import React, { useState, useEffect, useCallback } from 'react';
import { CssBaseline, Box, Typography, Grid, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AppAppBar from './AppAppBar';
import CarCard from './CarCard';
import { useThemeContext } from '../ThemeContext';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreCars, setHasMoreCars] = useState(true);
  const query = useQuery();
  const keywords = query.get('keywords');

  const fetchCars = useCallback(async (page) => {
    try {
      const response = await axios.get(`/search`, {
        params: { keywords, page, limit: 21 }
      });
      if (response.data.cars.length > 0) {
        setCars((prevCars) => [...prevCars, ...response.data.cars]);
        setHasMoreCars(response.data.cars.length === 21);
      } else {
        setHasMoreCars(false);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [keywords]);

  useEffect(() => {
    if (keywords) {
      setCars([]);
      setPage(1);
      setHasMoreCars(true);
      fetchCars(1);
    }
  }, [keywords, fetchCars]);

  const showMoreCars = () => {
    setPage((prevPage) => prevPage + 1);
    fetchCars(page + 1);
  };

  return (
    <Box
      sx={(theme) => ({
        pt: 16,
        pb: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'radial-gradient(circle, #a7bdd4, #b0c0d1)'
            : 'radial-gradient(circle, #001529, #090E10)',
      })}
    >
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Typography variant="h4" gutterBottom>
        Search Results for "{keywords}"
      </Typography>
      {cars.length > 0 ? (
        <>
          <Grid container spacing={2} sx={{ width: '100%', maxWidth: 1200 }}>
            {cars.map((car, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CarCard car={car} />
              </Grid>
            ))}
          </Grid>
          {hasMoreCars && (
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '2rem' }} onClick={showMoreCars}>
              Show More
            </Button>
          )}
        </>
      ) : (
        <Typography variant="body1">No cars found.</Typography>
      )}
    </Box>
  );
};

export default SearchResults;