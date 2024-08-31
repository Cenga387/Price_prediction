import * as React from 'react';
import { useState } from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import heroImage from '../assets/merc_hero.png'
import CarCard from './CarCard';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Hero() {

  const [modelResponse, setModelResponse] = useState(null);
  const [displacement, setDisplacement] = useState('');
  const [mileage, setMileage] = useState('');
  const [rimSize, setRimSize] = useState('');
  const [year, setYear] = useState('');
  const [kilowatts, setKilowatts] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [cars, setCars] = useState([])
  const [snackbarOpen, setSnackbarOpen] = useState({
      displacement: false,
      mileage: false,
      kilowatts: false,
      year: false,
      rimSize: false,
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen({ displacement: false, mileage: false, kilowatts: false, year: false, rimSize: false });
  };

  const handleDisplacementChange = (e) => {
    const value = parseFloat(e.target.value, 10);
    if (value < 0.6 || value > 7.3) {
      setSnackbarOpen({ ...snackbarOpen, displacement: true });
    } 
  };
  const handleMileageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 0 || value > 1000000) {
      setSnackbarOpen({ ...snackbarOpen, mileage: true });
    } 
  };
  const handleKilowattsChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (value < 34 || value > 560) {
      setSnackbarOpen({ ...snackbarOpen, kilowatts: true });
    } 
  };

  const handleYearChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1950 || value > 2024) {
      setSnackbarOpen({ ...snackbarOpen, year: true });
    } 
  };

  const handleRimSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 13 || value > 23) {
      setSnackbarOpen({ ...snackbarOpen, rimSize: true });
    }
  };
  const handleManufacturerChange = (event) => {
    setManufacturer(event.target.value);
  }
  
  const handlePredict = async () => {
    let endpoint = '';
    if (manufacturer === 'Volkswagen') {
      endpoint = '/volkswagen';
    } else if (manufacturer === 'Audi') {
      endpoint = '/audi';
    } else if (manufacturer === 'Mercedes') {
      endpoint = '/mercedes';
    }

    try {
      const response = await axios.get(endpoint, {
        params: {
          displacement: parseFloat(displacement),
          mileage: parseInt(mileage, 10),
          year: parseInt(year, 10),
          kilowatts: parseInt(kilowatts),
          rimSize: parseInt(rimSize),
        }
      });
      setModelResponse(response.data.model);
      setCars(response.data.cars);
    } catch (error) {
      console.error("There was an error predicting the car price!", error);
    }
  };

  const isButtonDisabled = !rimSize ||  !kilowatts || !mileage || !displacement || !manufacturer;


  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 14 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
          <Stack direction={{xs: 'column', md: 'row'}} spacing={2} alignItems='center'>
            <Container sx={{justifyContent: 'center', alignItems: 'center'}}>
              <Typography
                variant="h1"
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                }}
              >
                Welcome to our car price prediction AI
              </Typography>
              <Typography
                variant="h6"              
                alignSelf={{ xs: 'center', md: 'center' }}
                color="text.secondary"
                sx={{ 
                  alignSelf: 'center', 
                  width: { sm: '100%', md: '100%' }, 
                  textAlign: "center",
                  mt: 3,
                }}
              >
                Unlock the future of car valuations with our AI-powered platform. Simply input your car details, and let our advanced algorithm deliver accurate, data-driven price predictions in seconds. Experience the next generation of smart car buying and selling.
              </Typography>
            </Container>
            <Box
              component="img"
              sx={{
                width: 500,
                height: 400,
                objectFit: 'cover',
              }}
              alt="Description of the image"
              src={heroImage}
            />
          </Stack>
          <Box sx={{width: '100%'}}>
            <FormControl size='small' sx={{width: {xs: '100%', sm: '100%'}}}>
              <InputLabel id="demo-simple-select-autowidth-label">Manufacturer</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={manufacturer}
                onChange={handleManufacturerChange}
                sx={{borderRadius: 8, width: '100%'}} 
                label="Manufacturer"
              >
                <MenuItem value="None"><em>None</em></MenuItem>
                <MenuItem value='Volkswagen'>Volkswagen</MenuItem>
                <MenuItem value='Mercedes'>Mercedes</MenuItem>
                <MenuItem value='Audi'>Audi</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ width: { xs: '100%', sm: '100%' } }}
          >
            <TextField
              id="displacement"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter displacement"
              placeholder="Displacement"
              onChange={(e) => setDisplacement(e.target.value)}
              onBlur={handleDisplacementChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter displacement',
                min: 0.6,
                max: 7.3,
                step: 0.1,
              }}
              InputProps={{
                sx:{ borderRadius: 15,}
              }}
              sx={{ width: { xs: '100%', sm: '200px' } }}
              type='number'
            />
            <TextField
              id="mileage"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter mileage"
              placeholder="Mileage"
              onChange={(e) => setMileage(e.target.value)}
              onBlur={handleMileageChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter mileage',
                min: 0,
                max: 1_000_000,
                step: 1000,
              }}
              InputProps={{
                sx:{ borderRadius: 15, },
              }}
              sx={{ width: { xs: '100%', sm: '200px' } }}
              type='number'
            />
            <TextField
              id="year"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter year"
              placeholder="Year"
              onChange={(e) => setYear(e.target.value)}
              onBlur={handleYearChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter year',
                min: 1950,
                max: 2024,
              }}
              InputProps={{
                sx:{ borderRadius: 15, width: '100%' },
              }}
              sx={{ width: { xs: '100%', sm: '200px' } }}
              type= 'number'
            />
            <TextField
              id="kilowatts"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter kilowatts"
              placeholder="Kilowatts"
              onChange={(e) => setKilowatts(e.target.value)}
              onBlur={handleKilowattsChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter kilowatts',
                min: 34,
                max: 560
              }}
              InputProps={{
                sx:{ borderRadius: 15}  
              }}
              sx={{ width: { xs: '100%', sm: '200px' } }}
              type='number'
            />
            <TextField
              id="rimsize"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter rim size"
              placeholder="Rim size"
              onChange={(e) => setRimSize(e.target.value)}
              onBlur={handleRimSizeChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter kilowatts',
                min: 13,
                max: 23
              }}
              InputProps={{
                sx:{ borderRadius: 15, }  
              }}
              sx={{ width: { xs: '100%', sm: '200px' } }}
              type='number'
            />
            <Button 
              variant="contained" 
              color="primary" 
              size='medium' 
              sx={{borderRadius: 15, width: {xs: '100%', sm: '200px'}}}
              onClick={handlePredict}
              disabled={isButtonDisabled}
            >
              Predict
            </Button>
          </Stack>
          {modelResponse &&(
          <Box sx={{alignSelf: 'center', justifySelf: 'center'}}>
            <Typography sx={{fontSize: 16}}>Predicted  price of your car is: {modelResponse} KM</Typography>
          </Box>
          )}
        </Stack>
        {modelResponse &&(
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 4000, sm: 1950, md: 1350 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        >
          <Grid container spacing={2}>
            {cars.map((car, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CarCard car={car} />
              </Grid>
            ))}
          </Grid>
        </Box>
        )}
        <Snackbar
        open={snackbarOpen.displacement || snackbarOpen.mileage || snackbarOpen.kilowatts || snackbarOpen.year || snackbarOpen.rimSize}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarOpen.displacement && 'Please enter a value between 0.6 and 7.3 for displacement.'}
          {snackbarOpen.mileage && 'Please enter a value between 0 and 1,000,000 for mileage.'}
          {snackbarOpen.kilowatts && 'Please enter a value between 34 and 560 for kilowatts.'}
          {snackbarOpen.year && 'Please enter a value between 1950 and 2024 for year.'}
          {snackbarOpen.rimSize && 'Please enter a value between 13 and 23 for rim size.'}
        </Alert>
      </Snackbar>
      </Container>
    </Box>
  );
}

