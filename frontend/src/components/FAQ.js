import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
          component="h1"
          variant="h3"
          sx={(theme) => ({
            alignSelf: 'center', // Aligns the text to the start (left) of the container
            justifySelf: 'center', // Ensures the box is aligned to the left
            padding: '4px', // Padding around the text
            borderRadius: '40px', // Rounded corners
            textAlign: 'center', // Aligns text to the left inside the box
            marginLeft: '0vw', // Ensures the box is positioned on the left side
            marginRight: '0vw',
            marginTop: '3vw',
            marginBottom: '1vw',
          })}
        >
          Frequently Asked Questions
        </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === 'light'
                ? `#d1e0f0` 
                : theme.palette.grey[1000], 
          })}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header">
            <Typography component="h3" variant="subtitle2">
            What is this website for?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              This website helps users estimate the price of a car based on various factors
               such as <b>Mileage, Year, Kilowatts, Rim size,</b> and <b>Displacement</b>.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === 'light'
                ? `#d1e0f0` 
                : theme.palette.grey[1000], 
          })}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
            How accurate is the car price prediction?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              The predictions are based on historical data and machine learning algorithms.
               While we strive for accuracy, the estimates may vary due to market
                fluctuations and other factors.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === 'light'
                ? `#d1e0f0` 
                : theme.palette.grey[1000], 
          })}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
            What algorithms do you use for prediction?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
             We use an advanced machine learning algorithm, <b>RandomForestRegressor</b>, as well
             as <b>GridSearchCV</b> in order to find the optimal combination of hyperparameters for a given model.
             The R2 score of the model is <b>0.94</b>. 

            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === 'light'
                ? `#d1e0f0` 
                : theme.palette.grey[1000], 
          })}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
            Can I get a detailed report of the car’s specifications?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Yes, we offer detailed reports that include specifications like:
              Type of fuel used, Model, Color, Drivetrain, Emmision standard and others.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
