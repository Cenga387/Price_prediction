import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button
} from '@mui/material';

axios.defaults.baseURL = 'http://localhost:5000';

const ManufacturerDropdown = ({ value, onChange, options }) => (
  <FormControl fullWidth>
    <InputLabel>Manufacturer</InputLabel>
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const ModelDropdown = ({ value, onChange, options }) => (
  <FormControl fullWidth>
    <InputLabel>Model</InputLabel>
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Repeat similar components for each dropdown filter
const GenericDropdown = ({ label, value, onChange, options }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const BooleanRadioGroup = ({ label, value, onChange }) => (
  <FormControl component="fieldset">
    <Typography>{label}</Typography>
    <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
      <FormControlLabel value={true} control={<Radio />} label="Yes" />
      <FormControlLabel value={false} control={<Radio />} label="No" />
    </RadioGroup>
  </FormControl>
);

export default function StatsAndFilter() {
  const [displacementRange, setDisplacementRange] = useState([0, 5]);
  const [kilowattsRange, setKilowattsRange] = useState([50, 250]);
  const [mileageRange, setMileageRange] = useState([0, 200000]);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [doors, setDoors] = useState('');
  const [fuel, setFuel] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('');
  const [drivetrain, setDrivetrain] = useState('');
  const [rimSize, setRimSize] = useState('');
  const [transmission, setTransmission] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [cruiseControl, setCruiseControl] = useState('');
  const [airCondition, setAirCondition] = useState('');
  const [navigation, setNavigation] = useState('');
  const [registration, setRegistration] = useState('');

  const [dropdownData, setDropdownData] = useState({
    manufacturer: [],
    model: [],
    doors: [],
    fuel: [],
    location: [],
    color: [],
    drivetrain: [],
    rimSize: [],
    transmission: [],
    type: [],
    year: [],
  });

  useEffect(() => {
    // Fetch initial dropdown data
    axios.get('/api/unique-values').then((response) => {
      setDropdownData(response.data);
    });
  }, []);

  useEffect(() => {
    if (manufacturer) {
      // Fetch models based on manufacturer selection
      axios.get(`/api/models?manufacturer=${manufacturer}`).then((response) => {
        setDropdownData((prevData) => ({
          ...prevData,
          model: response.data,
        }));
      });

      // Fetch and update other filters based on manufacturer
      axios.get(`/api/unique-values?manufacturer=${manufacturer}`).then((response) => {
        setDropdownData(response.data);
      });
    }
  }, [manufacturer]);

  const applyFilters = () => {
    const filters = {
      displacementRange,
      kilowattsRange,
      mileageRange,
      priceRange,
      manufacturer,
      model,
      doors,
      fuel,
      location,
      color,
      drivetrain,
      year,
      rimSize,
      transmission,
      type,
      cruiseControl,
      airCondition,
      navigation,
      registration,
    };
    console.log('Applied Filters:', filters);
    // Perform filter application, e.g., making a POST request
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ManufacturerDropdown
            value={manufacturer}
            onChange={setManufacturer}
            options={dropdownData.manufacturer}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ModelDropdown
            value={model}
            onChange={setModel}
            options={dropdownData.model}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Displacement</Typography>
          <Slider
            value={displacementRange}
            onChange={(e, newValue) => setDisplacementRange(newValue)}
            valueLabelDisplay="auto"
            min={0.6}
            max={5}
            step={0.1}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Kilowatts</Typography>
          <Slider
            value={kilowattsRange}
            onChange={(e, newValue) => setKilowattsRange(newValue)}
            valueLabelDisplay="auto"
            min={48}
            max={240}
            step={1}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Mileage</Typography>
          <Slider
            value={mileageRange}
            onChange={(e, newValue) => setMileageRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={300000}
            step={1000}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Price</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
            step={1000}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Type"
            value={type}
            onChange={setType}
            options={dropdownData.type}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Transmission"
            value={transmission}
            onChange={setTransmission}
            options={dropdownData.transmission}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Year"
            value={dropdownData.year}
            onChange={setYear}
            options={dropdownData.year}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Location"
            value={location}
            onChange={setLocation}
            options={dropdownData.location}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Drivetrain"
            value={drivetrain}
            onChange={setDrivetrain}
            options={dropdownData.drivetrain}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Fuel"
            value={fuel}
            onChange={setFuel}
            options={dropdownData.fuel}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Rim Size"
            value={rimSize}
            onChange={setRimSize}
            options={dropdownData.rimSize}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Doors"
            value={doors}
            onChange={setDoors}
            options={dropdownData.doors}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <GenericDropdown
            label="Color"
            value={color}
            onChange={setColor}
            options={dropdownData.color}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <BooleanRadioGroup
            label="Cruise Control"
            value={cruiseControl}
            onChange={setCruiseControl}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <BooleanRadioGroup
            label="Air Condition"
            value={airCondition}
            onChange={setAirCondition}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <BooleanRadioGroup
            label="Navigation"
            value={navigation}
            onChange={setNavigation}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <BooleanRadioGroup
            label="Registration"
            value={registration}
            onChange={setRegistration}
          />
        </Grid>
      </Grid>

      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
}
