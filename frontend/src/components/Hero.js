import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import heroImage from '../assets/merc_hero.png'
import Dropdown from './Dropdown';

export default function Hero() {
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
          <Dropdown />
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
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter displacement',
              }}
              borderRadius={15}
            />
            <TextField
              id="mileage"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter mileage"
              placeholder="Mileage"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter mileage',
              }}
            />
            <TextField
              id="year"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter year"
              placeholder="Year"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter year',
              }}
            />
            <TextField
              id="kilowatts"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter kilowatts"
              placeholder="Kilowatts"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter kilowatts',
              }}
            />
            <TextField
              id="rimsize"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter rim size"
              placeholder="Rim size"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter rim size',
              }}
            />
            <Button variant="contained" color="primary" size='medium'>
              Predict
            </Button>
          </Stack>
          
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
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
        />
      </Container>
    </Box>
  );
}
