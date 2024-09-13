import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Header from './components/Header';
import Hero from './components/Hero';
import Graph from './components/Graph';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CarFilter from './components/CarFilter';
import Chatbot from './components/ChatBot';
import './css/scrollbar.css';
import { useThemeContext } from './ThemeContext';

export default function LandingPage() {
  const { mode, toggleColorMode } = useThemeContext();

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
    <Box 
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'radial-gradient(circle, #a7bdd4, #FFF, #a7bdd4, #FFF)'
            : 'radial-gradient(circle, #001529, #090E10, #001529, #090E10)',
      })}
    >
      <CssBaseline />
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Divider />
      <Graph mode={mode} />
      <Divider />
      <CarFilter />
      <Divider />
      <FAQ />
      <Divider />
      <Footer />
      <Chatbot mode={mode} />
    </Box>
  );
}
