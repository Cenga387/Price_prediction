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
import karavanAudi from '../assets/audi_types/karavan_audi.png'
import limuzinaAudi from '../assets/audi_types/limuzina_audi.png'
import maloAutoAudi from '../assets/audi_types/maloAuto_audi.png'
import kabrioletAudi from '../assets/audi_types/kabriolet_audi.png'
import monovolumenAudi from '../assets/audi_types/monovolumen_audi.png'
import sportskiKupeAudi from '../assets/audi_types/sportskiKupe_audi.png'
import SUVAudi from '../assets/audi_types/SUV_audi.png'
import terenacAudi from '../assets/audi_types/terenac_audi.png'
import offroadAudi from '../assets/audi_types/offroad_audi.png'
import kombiAudi from '../assets/audi_types/kombi_audi.png'
import oldtimerAudi from '../assets/audi_types/oldtimer_audi.png'
import caddyAudi from '../assets/audi_types/caddy_audi.png'
import deafultAudi from '../assets/audi_types/deafult_audi.png'

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
      Karavan: karavanAudi,
      Limuzina: limuzinaAudi,
      'Malo auto': maloAutoAudi,
      Kabriolet: kabrioletAudi,
      Monovolumen: monovolumenAudi,
      'Sportski/kupe': sportskiKupeAudi,
      SUV: SUVAudi,
      Terenac: terenacAudi,
      'Off Road': offroadAudi,
      Kombi: kombiAudi,
      Oldtimer: oldtimerAudi,
      'Off-Road': offroadAudi,
      Caddy: caddyAudi,
      default: deafultAudi,
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
    manufacturerToTypeImageMap[car.manufacturer]?.[car.type] ||
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
                Cruise Control: {car.cruiseControl ? 'Nema' : 'Ima'}
              </Typography>
              <Typography variant="body2" color="text.secondary" width={150}>
                Air Condition: {car.airCondition ? 'Nema' : 'Ima'}
              </Typography>
              <Typography variant="body2" color="text.secondary" width={150}>
                Navigacija: {car.navigation ? 'Nema' : 'Ima'}
              </Typography>
              <Typography variant="body2" color="text.secondary" width={150}>
                Registracija: {car.registration ? 'Nema' : 'Ima'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;
