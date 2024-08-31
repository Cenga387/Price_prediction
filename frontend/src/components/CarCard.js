import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Collapse, Modal, Box, Container} from '@mui/material';
import cardImage from '../assets/audi_a7.png';

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

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          display: 'flex',
          margin: '20px',
          transition: 'transform 0.2s',
          transform: expanded ? 'scale(1.05)' : 'scale(1)',
        }}
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
            src={cardImage}
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
                Kilometraža: {car.mileage} kilometara
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
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="car-details-modal-title" variant="h6" component="h2">
            {car.title} - {car.year}
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'center', my: 2,}}>
          <CardMedia
            component="img"
            sx={{
              width: 350,
              height: 200,
              objectFit: 'cover',
              justifySelf: 'center'
            }}
            src={cardImage}
            alt={car.model}
          />
          </Box>
          <Typography variant="h6" color="text.secondary">
            Cijena: {car.price}KM
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Opis: {car.title}
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Box  sx={{ flex: 1, mr: 2}}>
          <Typography variant="body2" color="text.secondary">
            Kilometraža: {car.mileage} kilometara
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

          <Box sx={{ flex: 1, pl: 7}}>
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
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;
