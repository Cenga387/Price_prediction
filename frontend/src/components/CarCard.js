import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Collapse, Modal, Box, IconButton, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import deafultCar from '../assets/deafult_car.png'
// Volkswagen types
import limuzinaVolkswagen from '../assets/volkswagen_types/limuzina_volkswagen.png';
import karavanVolkswagen from '../assets/volkswagen_types/karavan_volkswagen.png';
import terenacVolkswagen from '../assets/volkswagen_types/terenac_volkswagen.png';
import maloAutoVolkswagen from '../assets/volkswagen_types/maloAuto_volkswagen.png';
import caddyVolkswagen from '../assets/volkswagen_types/caddy_volkswagen.png';
import SUVVolkswagen from '../assets/volkswagen_types/SUV_volkswagen.png';
import monovolumenVolkswagen from '../assets/volkswagen_types/monovolumen_volkswagen.png';
import kombiVolkswagen from '../assets/volkswagen_types/kombi_volkswagen.png';
import sportskiKupeVolkswagen from '../assets/volkswagen_types/sportskiKupe_volkswagen.png';
import oldtimerVolkswagen from '../assets/volkswagen_types/oldtimer_volkswagen.png';
import kabrioletVolkswagen from '../assets/volkswagen_types/kabriolet_volkswagen.png';
import pickupVolkswagen from '../assets/volkswagen_types/pickup_volkswagen.png';
import offroadVolkswagen from '../assets/volkswagen_types/offroad_volkswagen.png';
import defaultVolkswagen from '../assets/volkswagen_types/deafult_volkswagen.png';

// Audi types
import audi50 from '../assets/audi_types/50.png'
import audi80 from '../assets/audi_types/80.png'
import audi90 from '../assets/audi_types/90.png'
import audi100 from '../assets/audi_types/100.png'
import A1 from '../assets/audi_types/A1.png'
import A2 from '../assets/audi_types/A2.png'
import A3 from '../assets/audi_types/A3.png'
import A4 from '../assets/audi_types/A4.png'
import A4_allroad from '../assets/audi_types/A4 Allroad.png'
import A5 from '../assets/audi_types/A5.png'
import A6 from '../assets/audi_types/A6.png'
import A6_allroad from '../assets/audi_types/A6 Allroad.png'
import A7 from '../assets/audi_types/A7.png'
import A8 from '../assets/audi_types/A8.png'
import B4 from '../assets/audi_types/B4.png'
import Cabriolet from '../assets/audi_types/Cabriolet.png'
import S1 from '../assets/audi_types/S1.png'
import S3 from '../assets/audi_types/S3.png'
import S4 from '../assets/audi_types/S4.png'
import S5 from '../assets/audi_types/S5_RS5.png'
import S6 from '../assets/audi_types/S6.png'
import S7 from '../assets/audi_types/S7_RS7.png'
import S8 from '../assets/audi_types/S8.png'
import SQ3 from '../assets/audi_types/SQ3_RSQ3.png'
import Q2 from '../assets/audi_types/Q2.png'
import Q3 from '../assets/audi_types/Q3.png'
import Q4_e_tron from '../assets/audi_types/Q4 e-tron.png'
import Q5 from '../assets/audi_types/Q5.png'
import Q7 from '../assets/audi_types/Q7.png'
import Q8 from '../assets/audi_types/Q8.png'
import Q8_e_tron from '../assets/audi_types/Q8 e-tron.png'
import SQ5 from '../assets/audi_types/SQ5.png'
import SQ7 from '../assets/audi_types/SQ7.png'
import SQ8 from '../assets/audi_types/SQ8.png'
import RS3 from '../assets/audi_types/RS3.png'
import RS4 from '../assets/audi_types/RS4.png'
import RS5 from '../assets/audi_types/S5_RS5.png'
import RS6 from '../assets/audi_types/RS6.png'
import RS7 from '../assets/audi_types/S7_RS7.png'
import RSQ3 from '../assets/audi_types/SQ3_RSQ3.png'
import RSQ8 from '../assets/audi_types/RSQ8.png'
import R8 from '../assets/audi_types/R8.png'
import TT from '../assets/audi_types/TT.png'
import TT_RS from '../assets/audi_types/TT RS.png'
import e_tron_GT from '../assets/audi_types/e-tron GT.png'

// Mercedes types
import limuzinaMercedes from '../assets/mercedes_types/limuzina_mercedes.png'
import karavanMercedes from '../assets/mercedes_types/karavan_mercedes.png'
import maloAutoMercedes from '../assets/mercedes_types/maloAuto_mercedes.png'
import sportskiKupeMercedes from '../assets/mercedes_types/sportskiKupe_mercedes.png'
import kombiMercedes from '../assets/mercedes_types/kombi_mercedes.png'
import monovolumenMercedes from '../assets/mercedes_types/monovolumen_mercedes.png'
import kabrioletMercedes from '../assets/mercedes_types/kabriolet_mercedes.png'
import SUVMercedes from '../assets/mercedes_types/SUV_mercedes.png'
import terenacMercedes from '../assets/mercedes_types/terenac_mercedes.png'
import oldtimerMercedes from '../assets/mercedes_types/oldtimer_mercedes.png'
import offroadMercedes from '../assets/mercedes_types/offroad_mercedes.png'
import caddyMercedes from '../assets/mercedes_types/caddy_mercedes.png'
import pickupMercedes from '../assets/mercedes_types/pickup_mercedes.png'
import deafultMercedes from '../assets/mercedes_types/deafult_mercedes.png'


const CarCard = ({ car }) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  // Mapping of types to images
  const manufacturerToTypeImageMap = {
    Volkswagen: {
      Limuzina: limuzinaVolkswagen,
      Karavan: karavanVolkswagen,
      Terenac: terenacVolkswagen,
      'Malo auto': maloAutoVolkswagen,
      Caddy: caddyVolkswagen,
      SUV: SUVVolkswagen,
      Monovolumen: monovolumenVolkswagen,
      Kombi: kombiVolkswagen,
      'Sportski/kupe': sportskiKupeVolkswagen,
      Oldtimer: oldtimerVolkswagen,
      Kabriolet: kabrioletVolkswagen,
      'Pick-up': pickupVolkswagen,
      'Off Road': offroadVolkswagen,
      'Pick up': pickupVolkswagen,
      'Off-Road': offroadVolkswagen,
      default: defaultVolkswagen,
    },
    Audi: {
      '50': audi50,
      '80': audi80,
      '90': audi90,
      '100': audi100,
      A1: A1,
      A2: A2,
      A3: A3,
      A4: A4,
      'A4 Allroad': A4_allroad,
      A5: A5,
      A6: A6,
      'A6 Allroad': A6_allroad,
      A7: A7,
      A8: A8,
      B4: B4,
      Cabriolet: Cabriolet,
      S1: S1,
      S3: S3,
      S4: S4,
      S5: S5,
      S6: S6,
      S7: S7,
      S8: S8,
      SQ3: SQ3,
      Q2: Q2,
      Q3: Q3,
      'Q4 e-tron': Q4_e_tron,
      Q5: Q5,
      Q7: Q7,
      Q8: Q8,
      'Q8 e-tron': Q8_e_tron,
      SQ5: SQ5,
      SQ7: SQ7,
      SQ8: SQ8,
      RS3: RS3,
      RS4: RS4,
      RS5: RS5,
      RS6: RS6,
      RS7: RS7,
      RSQ3: RSQ3,
      RSQ8: RSQ8,
      R8: R8,
      TT: TT,
      TT_RS: TT_RS,
      e_tron_GT: e_tron_GT,
      default: A4,
    },
    'Mercedes-Benz': {
      Limuzina: limuzinaMercedes,
      Karavan: karavanMercedes,
      'Malo auto': maloAutoMercedes,
      'Sportski/kupe': sportskiKupeMercedes,
      Kombi: kombiMercedes,
      Monovolumen: monovolumenMercedes,
      Kabriolet: kabrioletMercedes,
      SUV: SUVMercedes,
      Terenac: terenacMercedes,
      Oldtimer: oldtimerMercedes,
      'Off-Road': offroadMercedes,
      'Off Road': offroadMercedes,
      Caddy: caddyMercedes,
      'Pick up': pickupMercedes,
      default: deafultMercedes,
    }
  };

  // Select image based on manufacturer and type
  const carImage =
    manufacturerToTypeImageMap[car.manufacturer]?.[car.model] ||
    manufacturerToTypeImageMap[car.manufacturer]?.default ||
    deafultCar; // Fallback in case manufacturer/type not found

  return (
    <>
      <Card
        sx={(theme) => ({
          maxWidth: 345,
          display: 'flex', 
          margin: '20px', 
          transition: 'transform 0.2s ease-in-out', 
          borderRadius: '20px', 
          '&:hover': 
          { transform: 'scale(1.05)', },
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#d1e0f0'
              : theme.palette.grey[900],
        })}
        
        onMouseEnter={handleExpandClick}
        onMouseLeave={handleExpandClick}
        onClick={handleOpenModal}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 300,
              height: 150,
              objectFit: 'cover',
              alignSelf: 'center',
            }}
            src={carImage}
            alt={car.model}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {car.model} - {car.year}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {car.price}KM
            </Typography>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Kilometraža: {car.mileage}km
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gorivo: {car.fuel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mjenjač: {car.transmission}
              </Typography>
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Card>

      {/* Modal for displaying full car information */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="car-details-modal-title"
        aria-describedby="car-details-modal-description"
      >
        <Box
          sx={(theme) => ({
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 500, 
            backgroundColor:
              theme.palette.mode === 'light'
                ? `#d1e0f0` 
                : theme.palette.grey[900], 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2, 
            outline: 'none',
          })}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="car-details-modal-title" variant="h6" component="h2" gutterBottom>
            {car.model} - {car.year}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CardMedia
              component="img"
              sx={{
                width: 350,
                height: 200,
                objectFit: 'cover',
                justifySelf: 'center',
              }}
              src={carImage}
              alt={car.model}
            />
          </Box>

          <Typography variant="h6" color="text.secondary">
            Cijena: {car.price}KM
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Opis: {car.title}
          </Typography>

          <Box sx={{  mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{ mr: 2 , width: 200}} id='car-details-1'>
                <Typography variant="body2" color="text.secondary" >
                  Kilometraža: {car.mileage}km
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gorivo: {car.fuel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mjenjač: {car.transmission}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Motor: {car.displacement}L
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kilovati: {car.kilowatts}kW
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Standard emisija: {car.emissionStandard}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pogon: {car.drivetrain}
                </Typography>
              </Box>

              <Box sx={{ pl: 7 }} id='car-details-2'>
                <Typography variant="body2" color="text.secondary" width={150}>
                  Tip: {car.type}
                </Typography>
                <Typography variant="body2" color="text.secondary" width={150}>
                  Veličina felgi: {car.rimSize}
                </Typography>
                <Typography variant="body2" color="text.secondary" width={150}>
                  Boja: {car.color}
                </Typography>
                <Typography variant="body2" color="text.secondary" width={150}>
                  Godina: {car.year}
                </Typography>
                <Typography variant="body2" color="text.secondary" width={150}>
                  Broj vrata: {car.doors}
                </Typography>
                <Typography variant="body2" color="text.secondary" width={150}>
                  Lokacija: {car.location}
                </Typography>
              </Box>
            </Box>

            <Box id='car-details-3' sx={{mt:3, justifyContent: 'space-between', display: 'flex'}}>
              <Typography variant="body2" color="text.secondary" width={150}>
                Cruise Control: <br/> {car.cruiseControl ? 'Nema' : 'Ima'}
              </Typography>
              <Typography variant="body2" color="text.secondary" width={150}>
                Air Condition: <br/> {car.airCondition ? 'Nema' : 'Ima'}
              </Typography>
              <Typography variant="body2" color="text.secondary" width={150}>
                Navigacija: <br/> {car.navigation ? 'Nema' : 'Ima'}
              </Typography>
              <Typography variant="body2" color="text.secondary" width={150}>
                Registracija: <br/> {car.registration ? 'Nema' : 'Ima'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;
