import React, { useState} from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, Stack, Container, Grid } from '@mui/material';
import CarCard from './CarCard';
import axios from 'axios';

// Set the base URL for axios requests
axios.defaults.baseURL = 'http://localhost:5000';

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
  const [page, setPage] = useState(1);
  const [hasMoreCars, setHasMoreCars] = useState(true);

  // Function to handle manufacturer change
  const handleManufacturerChange = (event) => {
    const selectedManufacturer = event.target.value;
    setManufacturer(selectedManufacturer);
    setSelectedModels([]);
    setSelectedDoors([]);
    setSelectedFuel([]);
    setSelectedColor([]);
    setSelectedTransmission([]);

    let endpoint = '';

    if (selectedManufacturer === 'Volkswagen') {
      endpoint = '/volkswagen/models';
    } else if (selectedManufacturer === 'Audi') {
      endpoint = '/audi/models';
    } else if (selectedManufacturer === 'Mercedes') {
      endpoint = '/mercedes/models';
    }

    if (!endpoint) {
      setModels([]);  // Clear models if no valid manufacturer is selected
      setDoors([]);
      setFuel([]);
      setColor([]);
      setTransmission([]);
      return;
    }

    // Fetch models and other filter options based on the selected manufacturer
    axios.get(endpoint)
      .then((response) => {
        const cars = response.data.cars;
        const sortedModels = cars.map(car => car.model).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a.localeCompare(b));
        setModels(sortedModels);
        setDoors(cars.map(car => car.doors.toString()).filter((v, i, a) => a.indexOf(v) === i).sort());
        setFuel(cars.map(car => car.fuel).filter((v, i, a) => a.indexOf(v) === i).sort());
        setColor(cars.map(car => car.color).filter((v, i, a) => a.indexOf(v) === i).sort());
        setTransmission(cars.map(car => car.transmission).filter((v, i, a) => a.indexOf(v) === i).sort());
      })
      .catch((error) => {
        console.error('Error fetching models:', error);
      });
  };

  // Function to handle changes in any filter
  const handleFilterChange = (setter, value, filterType) => {
    setter(value);
  };

  const handleFilter = async () => {
    try {
      const params = {
        manufacturer,
        model: selectedModels.join(','),
        doors: selectedDoors.join(','),
        fuel: selectedFuel.join(','),
        color: selectedColor.join(','),
        transmission: selectedTransmission.join(','),
        page: 1,
        limit: 12,
      };
      const response = await axios.get('/filter', { params });
      setCars(response.data.cars);
      setPage(2); // Reset to the next page
      setHasMoreCars(response.data.cars.length === 12);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleShowMore = async () => {
    try {
      const response = await axios.get('/filter', {
        params: {
          manufacturer,
          model: selectedModels.join(','),
          doors: selectedDoors.join(','),
          fuel: selectedFuel.join(','),
          color: selectedColor.join(','),
          transmission: selectedTransmission.join(','),
          page,
          limit: 12,
        },
      });
      setCars((prevCars) => [...prevCars, ...response.data.cars]);
      setPage(page + 1);
      setHasMoreCars(response.data.cars.length === 12);
    } catch (error) {
      console.error('Error fetching more cars:', error);
    }
  };

  return (
    <Container sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}>
      <Stack direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            alignItems={{ xs: 'center', sm: 'flex-start' }}
            spacing={1}
            useFlexGap
            sx={{ width: { xs: '100%', sm: '100%' }}}>
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
            <MenuItem value="Volkswagen">Volkswagen</MenuItem>
            <MenuItem value="Mercedes">Mercedes</MenuItem>
            <MenuItem value="Audi">Audi</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: { xs: '100%', sm: '200px' } }}>
          <InputLabel id="model-select-label">Model</InputLabel>
          <Select
            labelId="model-select-label"
            multiple
            value={selectedModels}
            onChange={(e) => handleFilterChange(setSelectedModels, e.target.value, 'model')}
            sx={{ borderRadius: 8, width: '100%' }}
            label="Model"
          >
            {models.map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: { xs: '100%', sm: '200px' } }}>
          <InputLabel id="doors-select-label">Doors</InputLabel>
          <Select
            labelId="doors-select-label"
            multiple
            value={selectedDoors}
            onChange={(e) => handleFilterChange(setSelectedDoors, e.target.value, 'doors')}
            sx={{ borderRadius: 8, width: '100%' }}
            label="Doors"
          >
            {doors.map((doorOption) => (
              <MenuItem key={doorOption} value={doorOption}>
                {doorOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: { xs: '100%', sm: '200px' } }}>
          <InputLabel id="fuel-select-label">Fuel</InputLabel>
          <Select
            labelId="fuel-select-label"
            multiple
            value={selectedFuel}
            onChange={(e) => handleFilterChange(setSelectedFuel, e.target.value, 'fuel')}
            sx={{ borderRadius: 8, width: '100%' }}
            label="Fuel"
          >
            {fuel.map((fuelOption) => (
              <MenuItem key={fuelOption} value={fuelOption}>
                {fuelOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: { xs: '100%', sm: '200px' } }}>
          <InputLabel id="color-select-label">Color</InputLabel>
          <Select
            labelId="color-select-label"
            multiple
            value={selectedColor}
            onChange={(e) => handleFilterChange(setSelectedColor, e.target.value, 'color')}
            sx={{ borderRadius: 8, width: '100%' }}
            label="Color"
          >
            {color.map((colorOption) => (
              <MenuItem key={colorOption} value={colorOption}>
                {colorOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ width: { xs: '100%', sm: '200px' } }}>
          <InputLabel id="transmission-select-label">Transmission</InputLabel>
          <Select
            labelId="transmission-select-label"
            multiple
            value={selectedTransmission}
            onChange={(e) => handleFilterChange(setSelectedTransmission, e.target.value, 'transmission')}
            sx={{ borderRadius: 8, width: '100%' }}
            label="Transmission"
          >
            {transmission.map((transmissionOption) => (
              <MenuItem key={transmissionOption} value={transmissionOption}>
                {transmissionOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Button variant="contained" color="primary" onClick={handleFilter} sx={{ marginTop: '20px' }}>
        Filter
      </Button>

      <Grid container spacing={2}>
        {cars.map((car, index) => (
           <Grid item xs={12} sm={6} md={4} key={index}>
             <CarCard car={car} />
          </Grid>
        ))}
      </Grid>

      {cars.length > 0 && hasMoreCars && (
        <Button variant="contained" color="primary" onClick={handleShowMore} sx={{ marginTop: '20px' }}>
          Show more
        </Button>
      )}
    </Container>
  );
}
