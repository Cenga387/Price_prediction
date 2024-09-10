import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResults';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;


