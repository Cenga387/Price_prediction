import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ToggleColorMode from './ToggleColorMode';
import myLogo from '../assets/bloomteq_logo.png';
import axios from 'axios';
import SearchCard from './SearchCard';

const logoStyle = {
  width: '120px',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '20%', 
  overflow: 'hidden',
  marginLeft: 0, 
  marginTop: 0,
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [openSearch, setSearchOpen] = React.useState(false);
  const [keywords, setKeywords] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setSearchOpen(false);
    setSearchResults([]); // Clear search results
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (keywords) {
      axios.get(`/search?keywords=${keywords}`)
        .then(response => {
          setSearchResults(response.data.cars);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    } else {
      setSearchResults([]);
    }
  }, [keywords]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search-results?keywords=${keywords}`);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 1,
        }}
      >
        <Container maxWidth="false">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 100,
              height: 100,
              border: '2px solid',
              borderColor: 'divider',
              borderRadius: 15,
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <img
                src={myLogo}
                style={logoStyle}
                alt="bloomteq logo"
                onClick={() => navigate('/')}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
                <MenuItem
                  onClick={() => scrollToSection('hero')}
                  sx={{ py: '6px', px: '12px', ml: 4 }}
                >
                  <Typography variant="body2" color="text.primary" sx={{ fontSize: '24px' }}>
                    Home
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection('CarStats')}
                  sx={{ py: '6px', px: '12px', ml: 4 }}
                >
                  <Typography variant="body2" color="text.primary" sx={{ fontSize: '24px' }}>
                    Car Stats
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection('CarFilter')}
                  sx={{ py: '6px', px: '12px', ml: 4 }}
                >
                  <Typography variant="body2" color="text.primary" sx={{ fontSize: '24px' }}>
                    Car Filter
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px', ml: 4 }}
                >
                  <Typography variant="body2" color="text.primary" sx={{ fontSize: '24px' }}>
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  onClick={handleClick}
                  label="Search for cars..."
                  variant="outlined"
                  value={keywords}
                  InputProps={{
                    sx: { borderRadius: '2rem' },
                  }}
                  onChange={(e) => setKeywords(e.target.value)}
                  size="small"
                  sx={{ mr: 2, borderRadius: '1rem' }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '2rem' }}>
                  Search
                </Button>
              </form>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('hero')}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('CarStats')}>
                    Car Stats
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('CarFilter')}>
                    Car Filter
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>
                    FAQ
                  </MenuItem>
                  <Divider />
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {openSearch && searchResults.length > 0 && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={ (theme) => ({pr: '1rem', pl: '1rem', pb: '1rem', width: '100%', height: 500, overflowY: 'scroll',               
          backgroundImage:
                theme.palette.mode === 'light'
                  ? 'radial-gradient(circle, #a7bdd4, #b0c0d1, #a7bdd4, #b0c0d1)'
                  : 'radial-gradient(circle, #031526, #0A161C)', maxWidth: 600, position: 'absolute', top: '100px', left: '75%', transform: 'translateX(-50%)', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem', zIndex: 10 })}>
            {searchResults.map((car, index) => (
              <SearchCard key={index} car={car} />
            ))}
          </Box>
        </ClickAwayListener>
      )}
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;