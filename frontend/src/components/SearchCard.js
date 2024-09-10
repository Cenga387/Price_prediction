import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Collapse, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import deafultCar from '../assets/deafult_car.png'
// Volkswagen types
import T1 from '../assets/volkswagen_types/T1.png'
import XL1 from '../assets/volkswagen_types/XL1.png'
import VW181 from '../assets/volkswagen_types/181.png'
import Atlas from '../assets/volkswagen_types/Atlas.png'
import Routan from '../assets/volkswagen_types/Routan.png'
import CC from '../assets/volkswagen_types/CC.png'
import T3 from '../assets/volkswagen_types/T3.png'
import Corrado from '../assets/volkswagen_types/Corrado.png'
import Eos from '../assets/volkswagen_types/Eos.png'
import Vento from '../assets/volkswagen_types/Vento.png'
import Buggy from '../assets/volkswagen_types/Buggy.png'
import LT from '../assets/volkswagen_types/LT.png'
import Taigo from '../assets/volkswagen_types/Taigo.png'
import Lupo from '../assets/volkswagen_types/Lupo.png'
import Crafter from '../assets/volkswagen_types/Crafter.png'
import T2 from '../assets/volkswagen_types/T2.png'
import Phaeton from '../assets/volkswagen_types/Phaeton.png'
import Fox from '../assets/volkswagen_types/Fox.png'
import e_Golf from '../assets/volkswagen_types/e_Golf.png'
import T_Cross from '../assets/volkswagen_types/T_Cross.png'
import Up from '../assets/volkswagen_types/Up.png'
import T7 from '../assets/volkswagen_types/T7.png'
import T6 from '../assets/volkswagen_types/T6.png'
import Buba_Beetle from '../assets/volkswagen_types/Buba_Beetle.png'
import T4 from '../assets/volkswagen_types/T4.png'
import ID_3 from '../assets/volkswagen_types/ID_3.png'
import ID_5 from '../assets/volkswagen_types/ID_5.png'
import ID_4 from '../assets/volkswagen_types/ID_4.png'
import Touareg from '../assets/volkswagen_types/Touareg.png'
import T_Roc from '../assets/volkswagen_types/T_Roc.png'
import T5 from '../assets/volkswagen_types/T5.png'
import Amarok from '../assets/volkswagen_types/Amarok.png'
import Sharan from '../assets/volkswagen_types/Sharan.png'
import Jetta from '../assets/volkswagen_types/Jetta.png'
import Passat_CC from '../assets/volkswagen_types/Passat_CC.png'
import Touran from '../assets/volkswagen_types/Touran.png'
import Caddy from '../assets/volkswagen_types/Caddy.png'
import Golf_Plus from '../assets/volkswagen_types/Golf_Plus.png'
import Polo from '../assets/volkswagen_types/Polo.png'
import Bora from '../assets/volkswagen_types/Bora.png'
import Tiguan from '../assets/volkswagen_types/Tiguan.png'
import Scirocco from '../assets/volkswagen_types/Scirocco.png'
import Golf from '../assets/volkswagen_types/Golf.png'
import Passat from '../assets/volkswagen_types/Passat.png'
import Arteon from '../assets/volkswagen_types/Arteon.png'

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

//Skoda types
import skoda105 from '../assets/skoda_types/105.png'
import skoda120 from '../assets/skoda_types/120.png'
import skoda130 from '../assets/skoda_types/130.png'
import Citigo from '../assets/skoda_types/Citigo.png'
import Enyaq from '../assets/skoda_types/Enyaq.png'
import EnyaqCoupe from '../assets/skoda_types/Enyaq Coupe.png'
import FabiaRS from '../assets/skoda_types/Fabia RS.png'
import Fabia from '../assets/skoda_types/Fabia.png'
import Favorit from '../assets/skoda_types/Favorit.png'
import Felicia from '../assets/skoda_types/Felicia.png'
import Octavia from '../assets/skoda_types/Octavia.png'
import OctaviaRS from '../assets/skoda_types/Octavia RS.png'
import OctaviaScout from '../assets/skoda_types/Octavia Scout.png'
import OctaviaTour from '../assets/skoda_types/Octavia Tour.png'
import Praktik from '../assets/skoda_types/Praktik.png'
import Roomster from '../assets/skoda_types/Roomster.png'
import Rapid from '../assets/skoda_types/Rapid.png'
import Scala from '../assets/skoda_types/Scala.png'
import Spaceback from '../assets/skoda_types/Spaceback.png'
import Yeti from '../assets/skoda_types/Yeti.png'
import Superb from '../assets/skoda_types/Superb.png'
import Kodiaq from '../assets/skoda_types/Kodiaq.png'
import Karoq from '../assets/skoda_types/Karoq.png'
import Kamiq from '../assets/skoda_types/Kamiq.png'

const SearchCard = ({ car }) => {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const manufacturerToTypeImageMap = {
        Volkswagen: {
        Arteon: Arteon,
        Passat: Passat,
        Golf: Golf,
        Scirocco: Scirocco,
        Tiguan: Tiguan,
        Bora: Bora,
        Polo: Polo,
        'Golf Plus': Golf_Plus,
        Caddy: Caddy,
        Touran: Touran,
        'Passat CC': Passat_CC,
        Jetta: Jetta,
        Sharan: Sharan,
        Amarok: Amarok,
        T5: T5,
        'T-Roc': T_Roc,
        Touareg: Touareg,
        'ID.4': ID_4,
        'ID.5': ID_5,
        'ID.3': ID_3,
        T4: T4,
        'Buba / Beetle': Buba_Beetle,
        T6: T6,
        T7: T7,
        'Up!': Up,
        'T-Cross': T_Cross,
        'e-Golf': e_Golf,
        Fox: Fox,
        Phaeton: Phaeton,
        T2: T2,
        Crafter: Crafter,
        Lupo: Lupo,
        Taigo: Taigo,
        LT: LT,
        Buggy: Buggy,
        Vento: Vento,
        Eos: Eos,
        Corrado: Corrado,
        T3: T3,
        CC: CC,
        Routan: Routan,
        Atlas: Atlas,
        '181': VW181,
        XL1: XL1,
        T1: T1,
        default: Golf,
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
        'Škoda': {
        '105': skoda105,
        '120': skoda120,
        '130': skoda130,
        Citigo: Citigo,
        Enyaq: Enyaq,
        'Enyaq Coupé': EnyaqCoupe,
        FabiaRS: FabiaRS,
        Fabia: Fabia,
        Favorit: Favorit,
        Felicia: Felicia,
        Octavia: Octavia,
        'Octavia RS': OctaviaRS,
        'Octavia Scout': OctaviaScout,
        'Octavia Tour': OctaviaTour,
        Praktik: Praktik,
        Roomster: Roomster,
        Rapid: Rapid,
        Scala: Scala,
        Spaceback: Spaceback,
        Yeti: Yeti,
        Superb: Superb,
        Kodiaq: Kodiaq,
        Karoq: Karoq,
        Kamiq: Kamiq,
        default: Fabia,      
        }
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
      const handleOpenModal = () => {
        setOpen(true);
      };
    
      const handleCloseModal = () => {
        setOpen(false);
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
                display: 'flex', 
                marginTop: 4, 
                borderRadius: '1rem',
                cursor: 'pointer',
                '&:hover': {
                    bgcolor:
                    theme.palette.mode === 'light'
                      ? 'rgb(240, 240, 240)' // Light mode hover color
                      : 'rgb(30, 30, 30)',  // Dark mode hover color
                },
                bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgb(255, 255, 255)'
                  : 'rgb(0, 0, 0)', 
                position: 'relative', 
                zIndex: 10, 
                height: '8rem' })}
                onMouseEnter={handleExpandClick}
                onMouseLeave={handleExpandClick}
                onClick={handleOpenModal}
                >
              <CardMedia
                component="img"
                sx={{ width: '12rem', height: 100,
                    objectFit: 'contain',
                 }}
                image={carImage}
                alt={car.title}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography gutterBottom variant="h7" component="div">
                    {car.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${car.price}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
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
        
export default SearchCard;