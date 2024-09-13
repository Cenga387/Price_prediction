import React, { useState, useEffect, useCallback } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, Stack, Container, Grid, Typography, Box, Slider, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CarCard from './CarCard';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const MANUFACTURERS = ['Volkswagen', 'Audi', 'Škoda'];

export default function CarFilter() {
  const [manufacturer, setManufacturer] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [cars, setCars] = useState([]);
  const [doors, setDoors] = useState([]);
  const [selectedDoors, setSelectedDoors] = useState([]);
  const [fuel, setFuel] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [displacementRange, setDisplacementRange] = useState([0.6, 5.2]);
  const [kilowattsRange, setKilowattsRange] = useState([20, 441]);
  const [mileageRange, setMileageRange] = useState([0, 400000]);
  const [priceRange, setPriceRange] = useState([0, 340000]);
  const [yearRange, setYearRange] = useState([1950, 2024]);
  const [cruiseControl, setCruiseControl] = useState('');
  const [airCondition, setAirCondition] = useState('');
  const [navigation, setNavigation] = useState('');
  const [registration, setRegistration] = useState('');
  const [page, setPage] = useState(1);
  const [hasMoreCars, setHasMoreCars] = useState(true);

  useEffect(() => {
    if (manufacturer) {
      const fetchFilterOptions = async () => {
        try {
          const response = await axios.get('/filter-options', {
            params: { manufacturer, models: selectedModels.join(',') }
          });
          setDoors(response.data.doors);
          setFuel(response.data.fuel);
          setColor(response.data.color);
          setTransmission(response.data.transmission);
        } catch (error) {
          console.error('Error fetching filter options:', error);
        }
      };
      fetchFilterOptions();
    } else {
      const fetchDefaultFilterOptions = async () => {
        try {
          const response = await axios.get('/default-filter-options');
          setDoors(response.data.doors);
          setFuel(response.data.fuel);
          setColor(response.data.color);
          setTransmission(response.data.transmission);
          setModels(response.data.models);
        } catch (error) {
          console.error('Error fetching default filter options:', error);
        }
      };
      fetchDefaultFilterOptions();
    }
  }, [manufacturer, selectedModels]);

  const handleManufacturerChange = useCallback((event) => {
    const selectedManufacturer = event.target.value;
    setManufacturer(selectedManufacturer);
    setSelectedModels([]);
    setSelectedDoors([]);
    setSelectedFuel([]);
    setSelectedColor([]);
    setSelectedTransmission([]);

    if (selectedManufacturer) {
      const endpointMap = {
        'Volkswagen': '/volkswagen/models',
        'Audi': '/audi/models',
        'Škoda': '/skoda/models'
      };

      const endpoint = endpointMap[selectedManufacturer] || '';

      if (!endpoint) {
        setModels([]);
        setDoors([]);
        setFuel([]);
        setColor([]);
        setTransmission([]);
        return;
      }

      axios.get(endpoint)
        .then((response) => {
          console.log(response.data);
          const models = response.data.models; 
          if (!Array.isArray(models)) {
            throw new Error('Invalid response format');
          }
          setModels(models.sort()); 
        })
        .catch((error) => {
          console.error('Error fetching models:', error);
        });
    } else {
      const fetchDefaultFilterOptions = async () => {
        try {
          const response = await axios.get('/default-filter-options');
          setDoors(response.data.doors);
          setFuel(response.data.fuel);
          setColor(response.data.color);
          setTransmission(response.data.transmission);
          setModels(response.data.models);
        } catch (error) {
          console.error('Error fetching default filter options:', error);
        }
      };
      fetchDefaultFilterOptions();
    }
  }, []);

  const handleFilterChange = useCallback((setter, value) => {
    setter(value);
  }, []);

  const handleFilter = useCallback(async () => {
    try {
      const params = {
        manufacturer,
        model: selectedModels.join(','),
        doors: selectedDoors.join(','),
        fuel: selectedFuel.join(','),
        color: selectedColor.join(','),
        transmission: selectedTransmission.join(','),
        displacementRangeMin: displacementRange[0],
        displacementRangeMax: displacementRange[1],
        kilowattsRangeMin: kilowattsRange[0],
        kilowattsRangeMax: kilowattsRange[1],
        mileageRangeMin: mileageRange[0],
        mileageRangeMax: mileageRange[1],
        priceRangeMin: priceRange[0],
        priceRangeMax: priceRange[1],
        yearRangeMin: yearRange[0],
        yearRangeMax: yearRange[1],
        cruiseControl: cruiseControl.toUpperCase(),
        airCondition: airCondition.toUpperCase(),
        navigation: navigation.toUpperCase(),
        registration: registration.toUpperCase(),
        page: 1,
        limit: 12,
      };
      const response = await axios.get('/filter', { params });
      setCars(response.data.cars);
      setPage(2);
      setHasMoreCars(response.data.cars.length === 12);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }, [manufacturer, selectedModels, selectedDoors, selectedFuel, selectedColor, selectedTransmission, displacementRange, kilowattsRange, mileageRange, priceRange, yearRange, cruiseControl, airCondition, navigation, registration]);

  const handleReset = useCallback(() => {
    setManufacturer('');
    setModels([]);
    setSelectedModels([]);
    setDoors([]);
    setSelectedDoors([]);
    setFuel([]);
    setSelectedFuel([]);
    setColor([]);
    setSelectedColor([]);
    setTransmission([]);
    setSelectedTransmission([]);
    setDisplacementRange([0.6, 5.2]);
    setKilowattsRange([20, 441]);
    setMileageRange([0, 400000]);
    setPriceRange([0, 340000]);
    setYearRange([1950, 2024]);
    setCruiseControl('');
    setAirCondition('');
    setNavigation('');
    setRegistration('');
    setCars([]);
    setPage(1);
    setHasMoreCars(true);
  }, []);

  const handleShowMore = useCallback(async () => {
    try {
      const params = {
        manufacturer,
        model: selectedModels.join(','),
        doors: selectedDoors.join(','),
        fuel: selectedFuel.join(','),
        color: selectedColor.join(','),
        transmission: selectedTransmission.join(','),
        displacementRangeMin: displacementRange[0],
        displacementRangeMax: displacementRange[1],
        kilowattsRangeMin: kilowattsRange[0],
        kilowattsRangeMax: kilowattsRange[1],
        mileageRangeMin: mileageRange[0],
        mileageRangeMax: mileageRange[1],
        priceRangeMin: priceRange[0],
        priceRangeMax: priceRange[1],
        yearRangeMin: yearRange[0],
        yearRangeMax: yearRange[1],
        cruiseControl: cruiseControl.toUpperCase(),
        airCondition: airCondition.toUpperCase(),
        navigation: navigation.toUpperCase(),
        registration: registration.toUpperCase(),
        page,
        limit: 12,
      };
      const response = await axios.get('/filter', { params });
      setCars((prevCars) => [...prevCars, ...response.data.cars]);
      setPage(page + 1);
      setHasMoreCars(response.data.cars.length === 12);
    } catch (error) {
      console.error('Error fetching more cars:', error);
    }
  }, [manufacturer, selectedModels, selectedDoors, selectedFuel, selectedColor, selectedTransmission, displacementRange, kilowattsRange, mileageRange, priceRange, yearRange, cruiseControl, airCondition, navigation, registration, page]);

  const handleSelectAllModels = useCallback(() => {
    setSelectedModels(selectedModels.length === models.length ? [] : models);
  }, [selectedModels, models]);

  const renderSelect = useCallback((label, value, onChange, options) => (
    <FormControl size="small" sx={{ width: { xs: '100%', sm: '200px' } }}>
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        multiple
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ borderRadius: 8, width: '100%' }}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ), []);

  const renderSlider = useCallback((label, value, onChange, min, max, step) => (
    <Box sx={{ width: { xs: '100%', sm: '100%' } }}>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
      />
    </Box>
  ), []);

  const renderBooleanRadioGroup = useCallback((label, value, onChange) => (
    <FormControl component="fieldset" sx={{ width: { xs: '100%', sm: '100%' }, alignItems: 'start' }}>
      <Typography>{label}</Typography>
      <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
        <FormControlLabel value="TRUE" control={<Radio />} label="No" />
        <FormControlLabel value="FALSE" control={<Radio />} label="Yes" />
      </RadioGroup>
    </FormControl>
  ), []);

  return (
    <Box id="CarFilter">
      <Container title="Title">
        <Typography
          component="h1"
          variant="h3"
          sx={(theme) => ({
            alignSelf: 'center', 
            justifySelf: 'center', 
            padding: '4px', 
            borderRadius: '40px', 
            textAlign: 'center', 
            marginLeft: '0vw', 
            marginRight: '0vw',
            marginTop: 2,
            marginBottom: '1vw',
          })}
        >
          Car Filter
        </Typography>
      </Container>
      <Container sx={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '3vh',
            marginTop: 2,
            textAlign: 'center',
          }}
        >
          Choose between different characteristics, to filter out the cars you want to see:
        </Typography>
      </Container>
      <Container sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        gap: { xs: 3, sm: 3 },
      }}>
        <Stack direction={{ xs: 'column', sm: 'row' }}
          alignSelf="center"
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          spacing={2}
          useFlexGap
          sx={{ width: { xs: '100%', sm: '100%' } }}>
          <FormControl size="small" sx={{ width: { xs: '100%', sm: '200px' } }}>
            <InputLabel id="manufacturer-select-label">Manufacturer</InputLabel>
            <Select
              labelId="manufacturer-select-label"
              id="manufacturer-select"
              value={manufacturer}
              onChange={handleManufacturerChange}
              sx={{ borderRadius: 8, width: '100%' }}
              label="Manufacturer"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {MANUFACTURERS.map((manu) => (
                <MenuItem key={manu} value={manu}>
                  {manu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {renderSelect('Model', selectedModels, setSelectedModels, models)}
          {renderSelect('Doors', selectedDoors, setSelectedDoors, doors)}
          {renderSelect('Fuel', selectedFuel, setSelectedFuel, fuel)}
          {renderSelect('Color', selectedColor, setSelectedColor, color)}
          {renderSelect('Transmission', selectedTransmission, setSelectedTransmission, transmission)}
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }}
          alignSelf="center"
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          spacing={4}
          useFlexGap
          sx={{ width: { xs: '100%', sm: '100%' } }}>
          {renderSlider('Displacement', displacementRange, setDisplacementRange, 0.6, 5.2, 0.1)}
          {renderSlider('Kilowatts', kilowattsRange, setKilowattsRange, 20, 441, 1)}
          {renderSlider('Mileage', mileageRange, setMileageRange, 0, 400000, 2000)}
          {renderSlider('Price', priceRange, setPriceRange, 0, 340000, 2000)}
          {renderSlider('Year', yearRange, setYearRange, 1950, 2024, 1)}
        </Stack>

        <Stack direction={{ xs: 'row', sm: 'row' }}
          alignSelf="center"
          alignItems={{ xs: 'center', sm: 'center' }}
          spacing={2}
          sx={{ width: { xs: '100%', sm: '100%' } }}>
          {renderBooleanRadioGroup('Cruise Control', cruiseControl, setCruiseControl)}
          {renderBooleanRadioGroup('Air Condition', airCondition, setAirCondition)}
          {renderBooleanRadioGroup('Navigation', navigation, setNavigation)}
          {renderBooleanRadioGroup('Registration', registration, setRegistration)}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" onClick={handleFilter} color="primary" size='medium' sx={{ borderRadius: 15, width: { xs: '100%', sm: '200px' } }}>
              Filter
            </Button>
            <Button variant="outlined" onClick={handleReset} color="secondary" size='medium' sx={{ borderRadius: 15, width: { xs: '100%', sm: '200px' } }}>
              Reset
            </Button>
          </Box>
        </Stack>

        <Grid container spacing={2}>
          {cars.map((car, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CarCard car={car} />
            </Grid>
          ))}
        </Grid>

        {cars.length > 0 && hasMoreCars && (
          <Button variant="contained" onClick={handleShowMore} color="primary" size='medium' sx={{ borderRadius: 15, width: { xs: '100%', sm: '200px' } }}>
            Show more
          </Button>
        )}
      </Container>
    </Box>
  );
}
       

