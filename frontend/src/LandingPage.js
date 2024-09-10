import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Graph from './components/Graph';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import CarFilter from './components/CarFilter';
import Chatbot from './components/ChatBot';
import './css/scrollbar.css';

export default function LandingPage() {
  
  const [mode, setMode] = React.useState('light');
  const showCustomTheme = false;

  const LPtheme = React.useMemo(() => createTheme(getLPTheme(mode)), [mode]);
  const defaultTheme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const appliedTheme = showCustomTheme ? LPtheme : defaultTheme;
  React.useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.style.setProperty('--scrollbar-thumb-bg', '#888');
      root.style.setProperty('--scrollbar-thumb-hover-bg', '#555');
    } else {
      root.style.setProperty('--scrollbar-thumb-bg', '#ccc');
      root.style.setProperty('--scrollbar-thumb-hover-bg', '#999');
    }
  }, [mode]);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Box 
       sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'radial-gradient(circle, #a7bdd4, #FFF, #a7bdd4, #FFF)'
            : 'radial-gradient(circle, #001529, #090E10, #001529, #090E10)',
      })}
      
      >
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Hero />
        <Divider />
        <Graph mode={mode} />
        <Divider />
        <CarFilter/>
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
        <Chatbot mode={mode} />
      </Box>
    </ThemeProvider>
  );
}
