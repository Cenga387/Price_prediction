import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResults';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


