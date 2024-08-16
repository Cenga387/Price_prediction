import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl size='small' sx={{width: 200}}>
        <InputLabel id="demo-simple-select-autowidth-label">Manufacturer</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          sx={{borderRadius: 8}} 
          label="Manufacturer"
        >
          <MenuItem value="None"><em>None</em></MenuItem>
          <MenuItem value='Volkswagen'>Volkswagen</MenuItem>
          <MenuItem value='Mercedes'>Mercedes</MenuItem>
          <MenuItem value='Audi'>Audi</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
