import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import myLogo from '../assets/bloomteq_logo.png';
import myLogo2 from '../assets/github_logo.png';

const logoStyle = {
  width: '60px',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '20%', 
  overflow: 'hidden',
  marginLeft: 0, 
  marginTop: 0,
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1} marginTop={4}>
      {'Copyright © '}
      <Link href="https://bloomteq.com/" target="_blank">Bloomteq&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 0, sm: 0 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href="https://bloomteq.com/" target="_blank"
            aria-label="Bloomteq"
            sx={{ alignSelf: 'center' }}
          >
            <img
                src={myLogo}
                style={logoStyle}
                alt="bloomteq logo"
              />
          </IconButton>
          
          <IconButton
            color="inherit"
            href="https://github.com/Cenga387/Price_prediction" target="_blank"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <img
                src={myLogo2}
                style={logoStyle}
                alt="github logo"
              />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
