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

const carTypes = {
   volkswagen: [
    { label: 'Off-road', value: 0 },
    { label: 'Oldtimer', value: 1 },
    { label: 'Cabriolet', value: 2 },
    { label: 'Malo auto', value: 3 },
    { label: 'Monovolumen', value: 4 },
    { label: 'Sportski/kupe', value: 5 },
    { label: 'Limuzina', value: 6 },
    { label: 'Caddy', value: 7 },
    { label: 'Kombi', value: 8 },
    { label: 'SUV', value: 9 },
    { label: 'Pickup', value: 10 }
  ],
  audi: [
    { label: 'Oldtimer', value: 0 },
    { label: 'Cabriolet', value: 1 },
    { label: 'Malo auto', value: 2 },
    { label: 'Limuzina', value: 3 },
    { label: 'Karavan', value: 4 },
    { label: 'Sportski/kupe', value: 5 },
    { label: 'SUV', value: 6 }
  ],
  skoda: [
    { label: 'Malo auto', value: 0 },
    { label: 'Caddy', value: 1 },
    { label: 'Limuzina', value: 2 },
    { label: 'Karavan', value: 3 },
    { label: 'Sportski/kupe', value: 4 },
    { label: 'SUV', value: 5 }
  ]
};

export default function Hero() {

  const [modelResponse, setModelResponse] = useState(null);
  const [displacement, setDisplacement] = useState('');
  const [mileage, setMileage] = useState('');
  const [year, setYear] = useState('');
  const [kilowatts, setKilowatts] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [transmission, setTransmission] = useState('');
  const [cars, setCars] = useState([])
  const [carType, setCarType] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState({
      displacement: false,
      mileage: false,
      kilowatts: false,
      year: false,
      carType: false,
      transmission: false,
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen({ displacement: false, mileage: false, kilowatts: false, year: false, carType: false, transmission: false });
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

  const handleCarTypeChange = (event) => {
    setCarType(event.target.value);
  };

  const handleYearChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1950 || value > 2024) {
      setSnackbarOpen({ ...snackbarOpen, year: true });
    } 
  };

  const handleManufacturerChange = (event) => {
    setManufacturer(event.target.value);
  }
  const handleTransmissionChange = (event) => {
    setTransmission(event.target.value);
  }
  
  const handlePredict = async () => {
    let endpoint = '';
    if (manufacturer === 'volkswagen') {
      endpoint = '/volkswagen';
    } else if (manufacturer === 'audi') {
      endpoint = '/audi';
    } else if (manufacturer === 'skoda') {
      endpoint = '/skoda';
    }

    try {
      const response = await axios.get(endpoint, {
        params: {
          displacement: parseFloat(displacement),
          mileage: parseInt(mileage, 10),
          year: parseInt(year, 10),
          kilowatts: parseInt(kilowatts),
          transmission: parseInt(transmission),
          type: parseInt(carType),
        }
      });
      setModelResponse(response.data.model);
      setCars(response.data.cars);
    } catch (error) {
      console.error("There was an error predicting the car price!", error);
    }
  };

  const isButtonDisabled = !kilowatts || !mileage || !displacement || !manufacturer;


  return (
    <Box id="hero">
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
                <MenuItem value='volkswagen'>Volkswagen</MenuItem>
                <MenuItem value='skoda'>Skoda</MenuItem>
                <MenuItem value='audi'>Audi</MenuItem>
              </Select>
            </FormControl>
            <FormControl size='small' sx={{width: {xs: '100%', sm: '100%'}}}>
              <InputLabel id="demo-simple-select-autowidth-label">Transmission</InputLabel>
              <Select
                labelId="transmission-label"
                id="transmission"
                value={transmission}
                onChange={handleTransmissionChange}
                sx={{borderRadius: 8, width: '100%'}} 
                label="Transmission"
              >
                <MenuItem value={0}>Manuelni</MenuItem>
                <MenuItem value={1}>Polu-automatik</MenuItem>
                <MenuItem value={2}>Automatik</MenuItem>
              </Select>
            </FormControl>
            <FormControl size='small' sx={{width: {xs: '100%', sm: '100%'}}}>
              <InputLabel id="car-type-label">Car Type</InputLabel>
              <Select
                labelId="car-type-label"
                id="car-type"
                value={carType}
                onChange={handleCarTypeChange}
                sx={{borderRadius: 8, width: '100%'}} 
                label="Car Type"
              >
                {manufacturer && carTypes[manufacturer] ? (
                  carTypes[manufacturer].map((type) => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                  ))
                ) : (
                  <MenuItem value=""><em>Select Manufacturer First</em></MenuItem>
                )}
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
          <Box
          sx={(theme) => ({
            alignSelf: 'center',
            justifySelf: 'center',
            padding: '16px', // Padding around the text
            borderRadius: '40px', // Rounded corners
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
            theme.palette.mode === 'light'
              ? `0 0 12px 8px ${alpha('#9CCCFC', 0.4)}`
              : `0 0 24px 12px ${alpha('#033363', 0.2)}`, // Optional: Adds a subtle shadow
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#d1e0f0'
                : theme.palette.grey[900],
            transition: 'opacity 0.3s ease', // Smooth transition for opacity change
            '&:hover': {
              opacity: 0.8, // Change opacity on hover
            },
          })}
        >
          <Typography sx={{ fontSize: 26 }}>
            Predicted price of your car is: <b>{modelResponse} KM</b>
          </Typography>
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
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.9)}`
                : `0 0 24px 12px ${alpha('#033363', 0.4)}`,
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

