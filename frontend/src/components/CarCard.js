import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Collapse, Modal, Box,} from '@mui/material';
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
              ${car.price}
            </Typography>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Mileage: {car.mileage} miles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fuel: {car.fuel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transmission: {car.transmission}
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
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="car-details-modal-title" variant="h6" component="h2">
            {car.model} - {car.year}
          </Typography>
          <CardMedia
            component="img"
            sx={{
              width: 350,
              height: 200,
              objectFit: 'cover',
            }}
            src={cardImage}
            alt={car.model}
          />
          <Typography variant="h6" color="text.secondary">
            Price: ${car.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mileage: {car.mileage} miles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fuel: {car.fuel}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Transmission: {car.transmission}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Color: {car.color}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Engine: {car.engine}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {car.description}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;
